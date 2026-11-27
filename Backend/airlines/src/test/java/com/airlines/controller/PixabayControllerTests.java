package com.airlines.controller;

import com.airlines.service.PixabayService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PixabayControllerTests {

    private PixabayService pixabayService;
    private PixabayController pixabayController;

    @BeforeEach
    public void setUp() {
        pixabayService = mock(PixabayService.class);
        pixabayController = new PixabayController(pixabayService);
    }

    @Test
    public void testGetBackgrounds() {
        List<String> mockImages = Arrays.asList(
                "https://images.unsplash.com/photo-1",
                "https://images.unsplash.com/photo-2"
        );
        when(pixabayService.getBackgroundsByCategory("aviation")).thenReturn(mockImages);

        ResponseEntity<List<String>> response = pixabayController.getBackgrounds("aviation", "horizontal", 1, 15);
        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        List<String> body = response.getBody();
        assertNotNull(body);
        assertEquals(2, body.size());
    }

    @Test
    public void testGetStructuredBackgrounds() {
        List<String> mockImages = Arrays.asList("https://images.unsplash.com/photo-1");
        when(pixabayService.getBackgroundsByCategory("cabin")).thenReturn(mockImages);

        ResponseEntity<Map<String, Object>> response = pixabayController.getStructuredBackgrounds("cabin");
        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        Map<String, Object> body = response.getBody();
        assertNotNull(body);
        assertEquals("cabin", body.get("category"));
        assertEquals(1, body.get("total"));
    }
}
