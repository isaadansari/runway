import React from "react";

interface AccordionItemProps {
  item: {
    title: string;
    description: string;
    body: string;
  };
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, onClick }) => {
  return (
    <div className={`accordion-item ${isOpen ? "open" : ""}`} onClick={onClick}>
      <div className="accordion-title">{item.title}</div>
      <div className="accordion-content">
        <div className="accordion-text">
          <div className="accordion-heading">{item.description}</div>
          <div className="accordion-object">
            <span className="object-span"></span>
          </div>
          {item.body}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
