'use client'

import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { motion } from "framer-motion";

export default function FAQs() {
  const faqItems = [
    {
      id: 'item-1',
      question: 'What is AbhiWorks?',
      answer: 'AbhiWorks is a digital growth studio that combines technology, creativity, and AI to help businesses build, grow, and scale online.',
    },
    {
      id: 'item-2',
      question: 'What services does AbhiWorks offer?',
      answer: 'We offer web and app development, branding, social media content, lead generation, and AI automation.',
    },
    {
      id: 'item-3',
      question: 'How much do your services cost?',
      answer: 'Pricing depends on your project requirements. Contact us for a custom quote.',
    },
    {
      id: 'item-4',
      question: 'How long does a project take?',
      answer: 'It depends on the project. We’ll share the estimated timeline before starting.',
    },
    {
      id: 'item-5',
      question: 'Can I hire you for just one service?',
      answer: 'Yes! You can choose one service or combine multiple services to meet your needs.',
    },
    {
      id: 'item-6',
      question: 'Do you work with startups and small businesses?',
      answer: 'Yes! We partner with startups, local businesses, and established enterprises alike, tailoring our solutions to match your scale and budget.',
    },
    {
      id: 'item-7',
      question: 'Does AbhiWorks provide integration with third-party tools?',
      answer: 'Absolutely. We integrate seamless connections with modern CRM systems, analytics, payment gateways, marketing platforms, and AI models to streamline your business operations.',
    },
    {
      id: 'item-8',
      question: 'Can you help my business grow?',
      answer: 'Yes! We help businesses attract leads, improve their online presence, and automate tasks.',
    },
  ];

  return (
    <section className="py-16 md:py-24 w-full">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            <h2 className="text-foreground text-4xl font-semibold">FAQ's</h2>
            <p className="text-muted-foreground mt-4 text-balance text-lg opacity-80">
              Everything you need to know about AbhiWorks
            </p>
            <p className="text-muted-foreground mt-6 hidden md:block opacity-75">
              Can’t find what you’re looking for? Call our{' '}
              <a
                href="tel:+918247338613"
                className="text-primary font-medium hover:underline text-blue-600 dark:text-blue-400"
              >
                AbhiWorks support team directly
              </a>{' '}
              for assistance.
            </p>
          </div>

          <div className="md:col-span-3">
            <Accordion
              type="single"
              collapsible>
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-gray-200 dark:border-gray-800">
                  <AccordionTrigger className="cursor-pointer text-base font-medium hover:no-underline text-left max-[640px]:text-left">
                    <span className="text-left flex-1 mr-2">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="[word-break:normal] [overflow-wrap:normal] text-left">
                    <BlurredStagger text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <p className="text-muted-foreground mt-6 md:hidden opacity-75">
            Can't find what you're looking for?{' '}
            <a
              href="tel:+918247338613"
              className="text-primary font-medium hover:underline text-blue-600 dark:text-blue-400">
              Call us directly
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export const BlurredStagger = ({
  text = "built by AbhiWorks",
}: {
  text: string;
}) => {
  const words = text.split(" ");
 
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
      },
    },
  };
 
  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  let globalCharIndex = 0;
 
  return (
    <div className="w-full">
      <motion.p
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          wordBreak: "normal",
          overflowWrap: "normal",
          WebkitHyphens: "none",
          hyphens: "none",
        }}
        className="text-base leading-relaxed whitespace-normal opacity-90 break-normal [word-break:normal] [overflow-wrap:normal] [hyphens:none]"
      >
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            style={{
              wordBreak: "normal",
              overflowWrap: "normal",
              hyphens: "none",
            }}
            className="inline-block whitespace-nowrap mr-[0.28em] [word-break:normal]"
          >
            {word.split("").map((char) => {
              const charKey = globalCharIndex++;
              return (
                <motion.span
                  key={charKey}
                  variants={letterAnimation}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </motion.p>
    </div>
  );
};
