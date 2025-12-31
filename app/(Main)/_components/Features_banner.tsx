"use client";
import { motion, Variants } from "framer-motion"; // Variants eklendi
import { Lightbulb, TrendingUp, UserCheck } from "lucide-react";
import React from "react";

//  Variants(TYPE)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Features_banner() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 px-16 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        variants={itemVariants}
        className="border border-slate-300 rounded-md p-4 bg-orange-500/80 text-white flex flex-col items-center gap-2"
      >
        <h5 className="font-bold text-center">Personalized Study Plans</h5>
        <UserCheck size={32} strokeWidth={2.5} />
        <p className="text-sm text-center">
          Every student learns differently...
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="border border-slate-300 rounded-md p-4 bg-slate-800/80 text-white flex flex-col items-center gap-2"
      >
        <h5 className="font-bold text-center">
          Focus on New Generation Questions
        </h5>
        <Lightbulb size={32} strokeWidth={2.5} />
        <p className="text-sm text-center">
          Learn how to solve complex logic...
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="border border-slate-300 rounded-md p-4 bg-green-500/80 flex flex-col items-center gap-2"
      >
        <h5 className="font-bold text-center">Progress Tracking</h5>
        <TrendingUp size={32} strokeWidth={2.5} />
        <p className="text-sm text-center">Track the student's progress...</p>
      </motion.div>
    </motion.div>
  );
}
