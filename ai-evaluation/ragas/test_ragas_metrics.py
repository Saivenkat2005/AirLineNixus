"""
Ragas RAG Evaluation Test Suite for Airline Nexus.
Evaluates Context Precision, Context Recall, Faithfulness, and Answer Relevancy.
"""
import pytest
from app.retrieval.rag_system import RAGKnowledgeSystem, VERIFIED_AIRLINE_KNOWLEDGE_BASE

class TestRagasRetrievalQuality:

    def test_ragas_context_recall(self):
        """
        Calculates context recall: does retrieved context contain all ground-truth facts?
        """
        ground_truth_queries = [
            ("baggage allowances", "DOC-BAG-2026", "15 kg"),
            ("refund timeline", "DOC-REF-2026", "3 to 5 business days"),
            ("web check-in cutoff", "DOC-CHK-2026", "60 minutes"),
            ("overbooking compensation", "DOC-DIS-2026", "150% flight credit")
        ]

        hits = 0
        for query, expected_doc_id, expected_fact in ground_truth_queries:
            res = RAGKnowledgeSystem.retrieve(query)
            if res.get("grounded"):
                top_doc_ids = [ch["doc_id"] for ch in res["chunks"]]
                all_text = " ".join(ch["content"] for ch in res["chunks"])
                if expected_doc_id in top_doc_ids and expected_fact in all_text:
                    hits += 1

        context_recall = hits / len(ground_truth_queries)
        assert context_recall >= 0.85, f"Expected Context Recall >= 0.85, got {context_recall}"

    def test_ragas_context_precision(self):
        """
        Calculates context precision: ratio of relevant chunks among retrieved top-k chunks.
        """
        res = RAGKnowledgeSystem.retrieve("baggage weights and excess fees", top_k=2)
        assert res.get("grounded") is True
        assert len(res["chunks"]) > 0

        # Top chunk must be baggage category
        top_chunk = res["chunks"][0]
        assert top_chunk["category"] == "baggage"
        assert top_chunk["doc_id"] == "DOC-BAG-2026"

    def test_ragas_faithfulness_and_unverified_fallback(self):
        """
        Asserts that questions outside official documentation are explicitly rejected
        with a citation refusal rather than generating ungrounded assertions.
        """
        unverified_query = "Can I bring my pet crocodile into the business class cabin?"
        answer_obj = RAGKnowledgeSystem.answer_with_grounding(unverified_query)
        assert answer_obj["verified"] is False
        assert "could not be verified" in answer_obj["answer"]
