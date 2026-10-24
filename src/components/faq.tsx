import { Plus } from "lucide-react";
import { faqs } from "@/config/content";
import "@/app/information.css";

export function Faq({ limit }: { limit?: number }) {
  return (
    <div className="faq-list">
      {faqs.slice(0, limit).map(({ question, answer }) => (
        <details className="faq-item" key={question}>
          <summary>
            <span>{question}</span>
            <Plus size={19} strokeWidth={1.5} aria-hidden="true" />
          </summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
