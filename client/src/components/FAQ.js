import React, { useState } from "react";

const FAQ = () => {
  // Using useState to keep track of the open FAQ item
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Dummy data for the FAQs related to blood donation in Bangladesh
  const faqs = [
    {
      question:
        "What are the eligibility criteria for blood donation in Bangladesh?",
      answer:
        "In Bangladesh, the eligibility criteria for blood donation include being between the ages of 18 and 65, weighing at least 45 kg, and being in good health. Donors should also not have any chronic diseases or recent infections.",
    },
    {
      question: "How often can I donate blood?",
      answer:
        "You can donate whole blood every 3 months (90 days). If you donate platelets or plasma, you can do so more frequently, usually every 2 weeks.",
    },
    {
      question: "What should I do before and after donating blood?",
      answer:
        "Before donating blood, make sure to eat a healthy meal and stay hydrated. After donating, rest for a few minutes and drink fluids to replenish lost fluids. Avoid heavy exercise for the rest of the day.",
    },
    {
      question: "Where can I donate blood in Bangladesh?",
      answer:
        "Blood can be donated at hospitals, blood banks, and designated donation camps organized by various health organizations. Major cities like Dhaka and Chittagong have multiple locations for blood donation.",
    },
    {
      question: "Is blood donation safe?",
      answer:
        "Yes, blood donation is a safe process. Sterile, single-use needles are used for each donor, and strict health protocols are followed to ensure donor safety.",
    },
  ];

  // Function to toggle FAQ open state
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-y-12 md:grid md:grid-flow-row md:grid-cols-2 md:gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl">
              Get quick answers and insights about blood donation in Bangladesh
              with our FAQ section.
            </p>
          </div>
          <div>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="flex-col items-stretch justify-start border-b border-gray-200"
              >
                <div
                  className="flex cursor-pointer items-center justify-between px-4 py-4 md:pb-7 md:pt-3"
                  onClick={() => toggleFaq(index)}
                >
                  <p className="text-lg font-medium md:text-xl select-none">
                    {faq.question}
                  </p>
                  <div className="ml-6 flex h-6 w-7 self-start md:w-6">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-500 ${
                        openFaqIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M16 12l-8 8 8 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                {openFaqIndex === index && (
                  <div className="px-4 sm:px-8 py-4">
                    <p className="text-sm sm:text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
