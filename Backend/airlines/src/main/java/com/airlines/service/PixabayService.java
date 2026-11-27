package com.airlines.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Service
public class PixabayService {

    @Value("${pixabay.api.key:}")
    private String apiKey;

    private final String PIXABAY_API_URL = "https://pixabay.com/api/?key={key}&q={query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15";
    
    private final RestTemplate restTemplate;
    private final StringRedisTemplate redisTemplate;
    
    // In-memory L2 Cache: Category Query -> CacheEntry
    private final Map<String, CacheEntry> imageCache = new ConcurrentHashMap<>();
    private static final long CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

    // Curated high-resolution aviation & destination library for instant zero-latency responses
    private static final Map<String, List<String>> CURATED_FALLBACKS = new HashMap<>();

    static {
        CURATED_FALLBACKS.put("aviation", Arrays.asList(
            "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=85",
            "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=2000&q=85",
            "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=2000&q=85",
            "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=2000&q=85",
            "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=2000&q=85"
        ));
        CURATED_FALLBACKS.put("airplane", Arrays.asList(
            "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=85",
            "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=2000&q=85"
        ));
        CURATED_FALLBACKS.put("cockpit", Arrays.asList(
            "https://images.unsplash.com/photo-1519074069444-1ba4ea16e873?auto=format&fit=crop&w=2000&q=85",
            "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=2000&q=85"
        ));
        CURATED_FALLBACKS.put("cabin", Arrays.asList(
            "https://images.unsplash.com/photo-1540339832862-474599807836?auto=format&fit=crop&w=2000&q=85",
            "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=2000&q=85"
        ));
        CURATED_FALLBACKS.put("new york", Arrays.asList(
            "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2000&q=85",
            "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=2000&q=85"
        ));
        CURATED_FALLBACKS.put("london", Arrays.asList(
            "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&q=85",
            "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=2000&q=85"
        ));
        CURATED_FALLBACKS.put("delhi", Arrays.asList(
            "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=2000&q=85",
            "https://images.unsplash.com/photo-1598977123418-454555aaec6a?auto=format&fit=crop&w=2000&q=85"
        ));
        CURATED_FALLBACKS.put("mumbai", Arrays.asList(
            "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=2000&q=85",
            "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=2000&q=85"
        ));
        CURATED_FALLBACKS.put("bangalore", Arrays.asList(
            "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=2000&q=85"
        ));
        CURATED_FALLBACKS.put("dubai", Arrays.asList(
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85"
        ));
        CURATED_FALLBACKS.put("tokyo", Arrays.asList(
            "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=2000&q=85"
        ));
    }

    public PixabayService(@Autowired(required = false) StringRedisTemplate redisTemplate) {
        this.restTemplate = new RestTemplate();
        this.redisTemplate = redisTemplate;
    }

    public List<String> getBackgroundsByCategory(String category) {
        String cleanCategory = (category != null && !category.trim().isEmpty()) 
                ? category.trim().toLowerCase() 
                : "aviation";
        String queryKey = cleanCategory.replace(" ", "+");

        // 1. Check L1 Memory Cache
        CacheEntry entry = imageCache.get(queryKey);
        if (entry != null && (System.currentTimeMillis() - entry.timestamp < CACHE_TTL_MS)) {
            return entry.imageUrls;
        }

        // 2. Check Redis Distributed Cache
        if (redisTemplate != null) {
            try {
                String redisKey = "media:bg:" + queryKey;
                String cachedCsv = redisTemplate.opsForValue().get(redisKey);
                if (cachedCsv != null && !cachedCsv.isEmpty()) {
                    List<String> urls = Arrays.asList(cachedCsv.split(";;;"));
                    imageCache.put(queryKey, new CacheEntry(urls, System.currentTimeMillis()));
                    return urls;
                }
            } catch (Exception ignored) {}
        }

        // 3. Query Pixabay API if API key configured
        if (apiKey != null && !apiKey.trim().isEmpty()) {
            try {
                @SuppressWarnings("unchecked")
                Map<String, Object> response = restTemplate.getForObject(
                    PIXABAY_API_URL.replace("{key}", apiKey).replace("{query}", queryKey), 
                    Map.class
                );

                if (response != null && response.containsKey("hits")) {
                    @SuppressWarnings("unchecked")
                    List<Map<String, Object>> hits = (List<Map<String, Object>>) response.get("hits");
                    List<String> urls = new ArrayList<>();
                    for (Map<String, Object> hit : hits) {
                        if (hit.containsKey("largeImageURL")) {
                            urls.add((String) hit.get("largeImageURL"));
                        }
                    }
                    
                    if (!urls.isEmpty()) {
                        Collections.shuffle(urls);
                        imageCache.put(queryKey, new CacheEntry(urls, System.currentTimeMillis()));
                        if (redisTemplate != null) {
                            try {
                                redisTemplate.opsForValue().set("media:bg:" + queryKey, String.join(";;;", urls), 24, TimeUnit.HOURS);
                            } catch (Exception ignored) {}
                        }
                        return urls;
                    }
                }
            } catch (Exception e) {
                System.err.println("Failed to fetch Pixabay images: " + e.getMessage());
            }
        }

        // 4. Return Curated High-Definition Aviation Imagery
        for (Map.Entry<String, List<String>> kv : CURATED_FALLBACKS.entrySet()) {
            if (cleanCategory.contains(kv.getKey())) {
                List<String> fallbackUrls = new ArrayList<>(kv.getValue());
                Collections.shuffle(fallbackUrls);
                imageCache.put(queryKey, new CacheEntry(fallbackUrls, System.currentTimeMillis()));
                return fallbackUrls;
            }
        }

        List<String> defaultUrls = new ArrayList<>(CURATED_FALLBACKS.get("aviation"));
        Collections.shuffle(defaultUrls);
        imageCache.put(queryKey, new CacheEntry(defaultUrls, System.currentTimeMillis()));
        return defaultUrls;
    }

    private static class CacheEntry {
        List<String> imageUrls;
        long timestamp;

        CacheEntry(List<String> imageUrls, long timestamp) {
            this.imageUrls = imageUrls;
            this.timestamp = timestamp;
        }
    }
}
