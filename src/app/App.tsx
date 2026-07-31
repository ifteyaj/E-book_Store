import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Bookmark,
  X,
  ShoppingCart,
  ArrowUpRight,
  ChevronDown,
  Star,
  Check,
  Minus,
  Plus,
  ExternalLink,
  Sparkles,
  Layers,
  Cpu,
  Compass,
  Terminal,
  ShieldCheck,
  Mail,
  ArrowRight,
  User,
  Zap,
  BookOpen,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Menu
} from "lucide-react";
import booksImg from "@/imports/Html→Body-1/0e6bd5e775b3fbc7260854f8570fa7a366274c9d.png";
import footerIllustration from "../../assets/footer-illustration.png";
import logo from "../../assets/logo.svg";

// ─── Logo ───────────────────────────────────────────────────────────────────
function BitifyLogo({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="shrink-0 focus:outline-none group" aria-label="Bitify home">
      <img
        src={logo}
        alt="Bitify"
        className="h-8 w-auto transition-transform group-hover:scale-105"
      />
    </button>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────
type Category = "All" | "Prompt Packs" | "Design Kits" | "Automation" | "Agent Skills" | "Vibe Coding" | "Guides";
type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  badge?: "New" | "Free" | "Sale";
  category: Exclude<Category, "All">;
  cover: React.ReactNode;
  description: string;
  rating: number;
  reviews: number;
  platforms: string[];
  tags: string[];
}

interface CartItem {
  product: Product;
  qty: number;
}

// ─── Product Covers ──────────────────────────────────────────────────────────
function CoverPromptSystems() {
  return (
    <div className="flex h-[182px] items-center justify-center relative shrink-0 w-[138px]">
      <div className="-rotate-3">
        <div
          className="flex flex-col h-[176px] items-start justify-between pb-4 pt-4 px-4 relative w-[128px] shadow-md"
          style={{ background: "#111" }}
        >
          <div className="text-white" style={{ fontFamily: "Georgia, serif", fontSize: 20, lineHeight: "20px" }}>
            <div>Prompt</div>
            <div>Systems</div>
          </div>
          <div className="text-white uppercase tracking-[1.8px]" style={{ fontSize: 9, fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
            <div>PRODUCT</div>
            <div>DESIGN</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoverNoCode() {
  return (
    <div className="flex items-center justify-center h-[182px] w-[138px] shrink-0">
      <div
        className="flex flex-col h-[176px] items-start justify-between overflow-hidden p-4 relative w-[128px] shadow-md"
        style={{ background: "#e83b3b" }}
      >
        <div style={{ fontFamily: "Georgia, serif", fontSize: 24, lineHeight: "24px", color: "#111" }}>
          <div>No-code</div>
          <div>Stacks</div>
        </div>
        <div className="uppercase tracking-[1.62px]" style={{ fontSize: 9, color: "#111", fontFamily: "Inter, sans-serif" }}>
          <div>BLUEPRINT NO.</div>
          <div>04</div>
        </div>
        <div className="absolute bottom-[-28px] right-[-20px] rounded-full size-24 border-[8px] border-[#111]" />
      </div>
    </div>
  );
}

function CoverAgentSkills() {
  return (
    <div className="flex items-center justify-center h-[182px] w-[138px] shrink-0">
      <div
        className="flex flex-col h-[176px] items-start justify-between p-4 relative w-[128px] shadow-md"
        style={{ background: "rgba(245,245,243,0.95)", border: "1px solid #e5e5e2" }}
      >
        <div style={{ fontFamily: "Georgia, serif", fontSize: 24, lineHeight: "24px", color: "#111" }}>
          <div>Agent</div>
          <div>Skills</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-[6px] w-full bg-[#111]" />
          <div className="h-[6px] w-16 bg-[#111]" />
          <div className="h-[6px] w-20 bg-[#111]" />
        </div>
        <div className="uppercase tracking-[1.62px]" style={{ fontSize: 9, color: "#111", fontFamily: "Inter, sans-serif" }}>
          <div>RESEARCH +</div>
          <div>WRITING</div>
        </div>
      </div>
    </div>
  );
}

function CoverVibeCoding() {
  return (
    <div className="flex h-[182px] items-center justify-center shrink-0 w-[138px]">
      <div className="rotate-2">
        <div
          className="flex flex-col h-[176px] items-start justify-between overflow-hidden px-4 py-4 relative w-[128px] shadow-md"
          style={{ background: "#111" }}
        >
          <div className="text-white" style={{ fontFamily: "Georgia, serif", fontSize: 20, lineHeight: "20px" }}>
            <div>Vibe</div>
            <div>Coding</div>
          </div>
          <div className="text-white uppercase tracking-[1.8px]" style={{ fontSize: 9, fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
            <div>STARTER</div>
            <div>PROMPTS</div>
          </div>
          <div className="absolute bg-[#e83b3b] bottom-4 right-4 rounded-full size-8" />
        </div>
      </div>
    </div>
  );
}

function CoverDesignSystems() {
  return (
    <div className="flex items-center justify-center h-[182px] w-[138px] shrink-0">
      <div
        className="flex flex-col h-[176px] items-start justify-between p-4 relative w-[128px] shadow-md"
        style={{ background: "#e83b3b" }}
      >
        <div style={{ fontFamily: "Georgia, serif", fontSize: 24, lineHeight: "24px", color: "#111" }}>
          <div>Systems</div>
          <div>in AI</div>
        </div>
        <div className="flex gap-1 items-start w-full">
          <div className="bg-[#111] h-5 flex-1" />
          <div className="h-5 flex-1 border border-[#111]" />
          <div className="h-5 flex-1" style={{ background: "rgba(245,245,243,0.5)" }} />
        </div>
        <div className="uppercase tracking-[1.62px]" style={{ fontSize: 9, color: "#111", fontFamily: "Inter, sans-serif" }}>
          A FIELD GUIDE
        </div>
      </div>
    </div>
  );
}

function CoverCreativeWorkflows() {
  return (
    <div className="flex items-center justify-center h-[182px] w-[138px] shrink-0">
      <div
        className="flex flex-col h-[176px] items-start justify-between overflow-hidden p-4 relative w-[128px] shadow-md"
        style={{ background: "rgba(245,245,243,0.95)", border: "1px solid #e5e5e2" }}
      >
        <div style={{ fontFamily: "Georgia, serif", fontSize: 20, lineHeight: "20px", color: "#111" }}>
          <div>Creative</div>
          <div>Workflows</div>
        </div>
        <div className="uppercase tracking-[1.62px]" style={{ fontSize: 9, color: "#111", fontFamily: "Inter, sans-serif" }}>
          FIELD NOTES
        </div>
        <div className="absolute bg-[#e83b3b] bottom-[-32px] left-[-32px] rounded-full size-28" />
      </div>
    </div>
  );
}

function CoverAIPromptLibrary() {
  return (
    <div className="flex items-center justify-center h-[182px] w-[138px] shrink-0">
      <div className="-rotate-2">
        <div
          className="flex flex-col h-[176px] items-start justify-between overflow-hidden p-4 relative w-[128px] shadow-md"
          style={{ background: "#111" }}
        >
          <div className="text-white" style={{ fontFamily: "Georgia, serif", fontSize: 18, lineHeight: "20px" }}>
            <div>AI Prompt</div>
            <div>Library</div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="h-1 w-full bg-[#e83b3b] rounded-full" />
            <div className="h-1 w-3/4 bg-[#e83b3b] rounded-full opacity-70" />
            <div className="h-1 w-1/2 bg-[#e83b3b] rounded-full opacity-40" />
          </div>
          <div className="text-white uppercase tracking-[1.62px]" style={{ fontSize: 9, fontFamily: "Inter, sans-serif" }}>
            WRITING EDITION
          </div>
        </div>
      </div>
    </div>
  );
}

function CoverUXDesignKit() {
  return (
    <div className="flex items-center justify-center h-[182px] w-[138px] shrink-0">
      <div
        className="flex flex-col h-[176px] items-start justify-between p-4 relative w-[128px] shadow-md"
        style={{ background: "#f0ede8" }}
      >
        <div style={{ fontFamily: "Georgia, serif", fontSize: 20, lineHeight: "22px", color: "#111" }}>
          <div>UX</div>
          <div>Design</div>
          <div>Kit</div>
        </div>
        <div className="flex gap-2">
          <div className="rounded-full size-6 bg-[#111]" />
          <div className="rounded-full size-6 bg-[#e83b3b]" />
          <div className="rounded-full size-6 border-2 border-[#111]" />
        </div>
        <div className="uppercase tracking-[1.62px]" style={{ fontSize: 9, color: "#707070", fontFamily: "Inter, sans-serif" }}>
          COMPONENT LIBRARY
        </div>
      </div>
    </div>
  );
}

function CoverAutomationPlaybook() {
  return (
    <div className="flex items-center justify-center h-[182px] w-[138px] shrink-0">
      <div
        className="flex flex-col h-[176px] items-start justify-between overflow-hidden p-4 relative w-[128px] shadow-md"
        style={{ background: "#e83b3b" }}
      >
        <div style={{ fontFamily: "Georgia, serif", fontSize: 20, lineHeight: "22px", color: "#fff" }}>
          <div>Automation</div>
          <div>Playbook</div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          {[100, 75, 50].map((w, i) => (
            <div key={i} className="h-1.5 bg-white rounded-full opacity-90" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="text-white uppercase tracking-[1.62px]" style={{ fontSize: 9, fontFamily: "Inter, sans-serif" }}>
          NO-CODE EDITION
        </div>
      </div>
    </div>
  );
}

function CoverBrandGuide() {
  return (
    <div className="flex items-center justify-center h-[182px] w-[138px] shrink-0">
      <div className="rotate-1">
        <div
          className="flex flex-col h-[176px] items-start justify-between p-4 relative w-[128px] shadow-md"
          style={{ background: "#fff", border: "1px solid #e5e5e2" }}
        >
          <div style={{ fontFamily: "Georgia, serif", fontSize: 20, lineHeight: "22px", color: "#111" }}>
            <div>Brand</div>
            <div>Identity</div>
            <div>Guide</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center">
            <div className="size-6 bg-[#e83b3b] rounded-sm" />
          </div>
          <div className="uppercase tracking-[1.62px]" style={{ fontSize: 9, color: "#707070", fontFamily: "Inter, sans-serif" }}>
            DESIGN SYSTEM
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Product Data ─────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Prompt Systems for Product Design",
    price: 99.00,
    badge: "New",
    category: "Prompt Packs",
    cover: <CoverPromptSystems />,
    description: "A structured prompt library engineered for product designers. 200+ categorized prompts covering UX research, wireframing, design critique, and stakeholder communication. Built to slot directly into your existing workflow.",
    rating: 4.9,
    reviews: 128,
    platforms: ["PDF", "Notion"],
    tags: ["UI/UX", "Prompts", "Product"],
  },
  {
    id: 2,
    title: "Automation Blueprints: No-Code Stacks",
    price: 56.02,
    category: "Automation",
    cover: <CoverNoCode />,
    description: "Step-by-step no-code automation blueprints for Zapier, Make, and n8n. Connect your tools, eliminate repetitive tasks, and build systems that run while you sleep. 40+ workflow templates included.",
    rating: 4.7,
    reviews: 84,
    platforms: ["PDF", "Figma"],
    tags: ["Automation", "No-code", "Workflows"],
  },
  {
    id: 3,
    title: "Agent Skills: Research & Writing",
    price: 49.99,
    badge: "New",
    category: "Agent Skills",
    cover: <CoverAgentSkills />,
    description: "A toolkit of battle-tested agent skill prompts for deep research, content drafting, and editorial workflows. Works with Claude, GPT-4, and Gemini. Includes chain-of-thought templates and evaluation rubrics.",
    rating: 4.8,
    reviews: 56,
    platforms: ["PDF"],
    tags: ["AI Agents", "Writing", "Research"],
  },
  {
    id: 4,
    title: "Vibe Coding Starter Prompts",
    price: 49.09,
    badge: "Free",
    category: "Vibe Coding",
    cover: <CoverVibeCoding />,
    description: "Launch your first AI-assisted project with confidence. 80+ starter prompts for building apps, components, and features through natural language — no traditional coding experience required.",
    rating: 4.6,
    reviews: 203,
    platforms: ["PDF", "Notion"],
    tags: ["Vibe Coding", "Prompts", "Beginner"],
  },
  {
    id: 5,
    title: "Design Systems in the AI Era",
    price: 67.99,
    category: "Design Kits",
    cover: <CoverDesignSystems />,
    description: "A comprehensive field guide for building scalable design systems powered by AI. Covers token architecture, component documentation, AI-assisted audits, and multi-brand theming strategies.",
    rating: 4.9,
    reviews: 91,
    platforms: ["PDF", "Figma"],
    tags: ["Design Systems", "AI", "Tokens"],
  },
  {
    id: 6,
    title: "The Creative's Guide to Workflows",
    price: 99.93,
    badge: "Free",
    category: "Guides",
    cover: <CoverCreativeWorkflows />,
    description: "A beautifully curated guide to building intentional creative workflows. Covers project management, client communication, creative blocks, and integrating AI tools into a sustainable practice.",
    rating: 4.8,
    reviews: 167,
    platforms: ["PDF"],
    tags: ["Workflows", "Creativity", "Productivity"],
  },
  {
    id: 7,
    title: "AI Prompt Library: Writing Edition",
    price: 39.00,
    category: "Prompt Packs",
    cover: <CoverAIPromptLibrary />,
    description: "350+ curated prompts for writers, editors, and content strategists. Organized by use case: blog posts, newsletters, social, scripts, and long-form. Includes variation frameworks and tone-switching templates.",
    rating: 4.7,
    reviews: 312,
    platforms: ["PDF", "Notion"],
    tags: ["Writing", "Prompts", "Content"],
  },
  {
    id: 8,
    title: "UX Design Kit",
    price: 79.00,
    badge: "New",
    category: "Design Kits",
    cover: <CoverUXDesignKit />,
    description: "A complete UI component library and design resource kit for modern product teams. Includes 200+ components, icon sets, responsive grids, and annotation templates — all in Figma.",
    rating: 4.9,
    reviews: 74,
    platforms: ["Figma", "PDF"],
    tags: ["UI/UX", "Components", "Figma"],
  },
  {
    id: 9,
    title: "Automation Playbook: No-Code Edition",
    price: 44.99,
    category: "Automation",
    cover: <CoverAutomationPlaybook />,
    description: "The complete playbook for building personal and business automation with no-code tools. 25 real-world workflow case studies with step-by-step implementation guides for Make, Zapier, and Airtable.",
    rating: 4.6,
    reviews: 138,
    platforms: ["PDF"],
    tags: ["Automation", "No-code", "Productivity"],
  },
  {
    id: 10,
    title: "Brand Identity Guide",
    price: 58.00,
    category: "Design Kits",
    cover: <CoverBrandGuide />,
    description: "Build a cohesive brand identity from scratch. Covers logo development, typography pairing, color systems, voice and tone, and brand application across digital and print touchpoints.",
    rating: 4.7,
    reviews: 89,
    platforms: ["PDF", "Figma"],
    tags: ["Branding", "Identity", "Design"],
  },
  {
    id: 11,
    title: "Vibe Coding: Component Builder",
    price: 62.00,
    badge: "New",
    category: "Vibe Coding",
    cover: <CoverVibeCoding />,
    description: "A curated pack of prompts for building React, Vue, and Svelte components through AI-assisted development. Includes patterns for state management, API integration, and responsive layouts.",
    rating: 4.8,
    reviews: 45,
    platforms: ["PDF", "Notion"],
    tags: ["Vibe Coding", "React", "Components"],
  },
  {
    id: 12,
    title: "AI Research Agent Prompts",
    price: 0,
    badge: "Free",
    category: "Agent Skills",
    cover: <CoverAgentSkills />,
    description: "A free starter pack of research agent prompts covering competitive analysis, trend spotting, and fact-checking workflows. A taste of the full Agent Skills library.",
    rating: 4.5,
    reviews: 521,
    platforms: ["PDF"],
    tags: ["AI Agents", "Research", "Free"],
  },
];

const CATEGORIES: Category[] = ["All", "Prompt Packs", "Design Kits", "Automation", "Agent Skills", "Vibe Coding", "Guides"];

// ─── Category Icons ───────────────────────────────────────────────────────────
function CategoryIcon({ category }: { category: Category }) {
  const icons: Record<Category, React.ReactNode> = {
    All: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M6.90083 0.688542C6.5933 0.548264 6.24004 0.548264 5.9325 0.688542L0.933335 2.96354C0.721835 3.0568 0.58535 3.26614 0.58535 3.49729C0.58535 3.72844 0.721835 3.93778 0.933335 4.03104L5.93833 6.31187C6.24587 6.45215 6.59913 6.45215 6.90667 6.31187L11.9117 4.03687C12.1232 3.94362 12.2597 3.73427 12.2597 3.50313C12.2597 3.27198 12.1232 3.06263 11.9117 2.96937L6.90083 0.688542" stroke="#111" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M0.583335 6.41688C0.582771 6.64471 0.714903 6.85202 0.921668 6.94771L5.93833 9.22854C6.24422 9.36705 6.59495 9.36705 6.90083 9.22854L11.9058 6.95354C12.1168 6.85871 12.2518 6.64818 12.25 6.41688" stroke="#111" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M0.583335 9.33354C0.582771 9.56137 0.714903 9.76868 0.921668 9.86437L5.93833 12.1452C6.24422 12.2837 6.59495 12.2837 6.90083 12.1452L11.9058 9.87021C12.1168 9.77538 12.2518 9.56484 12.25 9.33354" stroke="#111" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "Prompt Packs": (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1.74533 9.53283C1.83111 9.7492 1.8502 9.98628 1.80017 10.2136L1.17892 12.1327C1.13822 12.3306 1.2028 12.5355 1.34964 12.6742C1.49647 12.813 1.70465 12.8659 1.89992 12.8141L3.89083 12.2319C4.10533 12.1894 4.32747 12.208 4.53192 12.2856C7.10355 13.4865 10.1663 12.6622 11.7878 10.3328C13.4093 8.00335 13.1189 4.84492 11.0997 2.85028C9.08055 0.855643 5.9188 0.603785 3.60934 2.25361C1.29988 3.90344 0.513064 6.97606 1.74533 9.53283" stroke="#111" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "Design Kits": (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1.16667 0.583333H4.08333C4.40528 0.583333 4.66667 0.844716 4.66667 1.16667V5.25C4.66667 5.57195 4.40528 5.83333 4.08333 5.83333H1.16667C0.844716 5.83333 0.583333 5.57195 0.583333 5.25V1.16667C0.583333 0.844716 0.844716 0.583333 1.16667 0.583333Z" stroke="#111" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.58333 0.583333H10.5C10.8219 0.583333 11.0833 0.844716 11.0833 1.16667V2.91667C11.0833 3.23862 10.8219 3.5 10.5 3.5H7.58333C7.26138 3.5 7 3.23862 7 2.91667V1.16667C7 0.844716 7.26138 0.583333 7.58333 0.583333Z" stroke="#111" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.58333 5.83333H10.5C10.8219 5.83333 11.0833 6.09472 11.0833 6.41667V10.5C11.0833 10.822 10.8219 11.0833 10.5 11.0833H7.58333C7.26138 11.0833 7 10.822 7 10.5V6.41667C7 6.09472 7.26138 5.83333 7.58333 5.83333Z" stroke="#111" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1.16667 8.16667H4.08333C4.40528 8.16667 4.66667 8.42805 4.66667 8.75V10.5C4.66667 10.8219 4.40528 11.0833 4.08333 11.0833H1.16667C0.844716 11.0833 0.583333 10.8219 0.583333 10.5V8.75C0.583333 8.42805 0.844716 8.16667 1.16667 8.16667Z" stroke="#111" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Automation: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M9.28317 2.33333C9.41911 1.94813 9.27043 1.52012 8.92496 1.30214C8.57949 1.08416 8.12916 1.13422 7.84 1.42275L2.59 6.67275C2.33966 6.92293 2.26468 7.29928 2.40004 7.6263C2.53539 7.95332 2.85441 8.16659 3.20833 8.16667H5.54283C5.63738 8.16679 5.726 8.21273 5.78059 8.28992C5.83519 8.36712 5.84897 8.46598 5.81758 8.55517L4.71683 11.6667C4.58084 12.052 4.72969 12.4802 5.07539 12.6981C5.4211 12.916 5.87158 12.8656 6.16058 12.5767L11.4106 7.32667C11.6606 7.07636 11.7353 6.70013 11.5998 6.37332C11.4644 6.04651 11.1454 5.83341 10.7917 5.83333H8.46008C8.36529 5.83347 8.27634 5.78753 8.22158 5.71015C8.16682 5.63277 8.15309 5.5336 8.18475 5.44425L9.28317 2.33333" stroke="#111" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "Agent Skills": (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M6.41667 2.91667V0.583333H4.08333M2.91667 2.91667H9.91667C10.5606 2.91667 11.0833 3.43943 11.0833 4.08333V8.75C11.0833 9.3939 10.5606 9.91667 9.91667 9.91667H2.91667C2.27277 9.91667 1.75 9.3939 1.75 8.75V4.08333C1.75 3.43943 2.27277 2.91667 2.91667 2.91667ZM0.583333 6.41667H1.75M11.0833 6.41667H12.25M8.16667 5.83333V7M4.66667 5.83333V7" stroke="#111" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "Vibe Coding": (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M10.5 9.33333L12.8333 7L10.5 4.66667M3.5 4.66667L1.16667 7L3.5 9.33333M8.45833 2.33333L5.54167 11.6667" stroke="#111" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Guides: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 2.91667V12.25M11.6672 11.0833C12.3114 11.083 12.8333 10.5608 12.8333 9.91667V2.91667C12.8333 2.27256 12.3114 1.75032 11.6672 1.75L9.33333 1.75117C8.4155 1.75089 7.55107 2.18267 7 2.91667C6.44917 2.18223 5.58471 1.75 4.66667 1.75H2.33333C1.68943 1.75 1.16667 2.27277 1.16667 2.91667V9.91667C1.16667 10.5608 1.68865 11.083 2.33275 11.0833H4.66667C5.58471 11.0833 6.44917 11.5156 7 12.25C7.55082 11.5156 8.41529 11.0833 9.33333 11.0833L7 2.91667" stroke="#111" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };
  return <>{icons[category]}</>;
}

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ type }: { type: "New" | "Free" | "Sale" }) {
  const colors = {
    New: "bg-[#e83b3b] text-white",
    Free: "bg-[#27c93f] text-white",
    Sale: "bg-[#f5a623] text-white",
  };
  return (
    <div className={`absolute left-3 top-3 px-[10px] py-1 rounded-full text-[10px] font-medium z-10 ${colors[type]}`}>
      {type}
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, onSelect, onAddToCart }: {
  product: Product;
  onSelect: () => void;
  onAddToCart: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="bg-[rgba(245,245,243,0.5)] rounded-[12px] flex flex-col cursor-pointer group"
      style={{ border: "1px solid rgba(229,229,226,0.5)" }}
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
      transition={{ duration: 0.18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.title}`}
    >
      <div className="p-3 flex flex-col gap-5 h-full">
        {/* Cover area */}
        <div className="bg-[rgba(238,238,235,0.5)] rounded-[14px] relative overflow-hidden flex items-center justify-center py-[60px]">
          {product.badge && <Badge type={product.badge} />}
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            className="absolute top-3 right-3 bg-white rounded-full size-7 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-[#f5f5f3]"
          >
            <ArrowUpRight size={14} color="#111" />
          </button>
          {product.cover}
        </div>

        {/* Info row */}
        <div className="flex items-center justify-between px-1">
          <span
            className="text-[#111] text-[15px] leading-5 flex-1 mr-2"
            style={{ fontFamily: "Forum, Georgia, serif" }}
          >
            {product.title}
          </span>
          <span
            className="text-[#e83b3b] text-[28px] font-medium leading-4 whitespace-nowrap shrink-0"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {product.price === 0 ? "Free" : `$${product.price.toFixed(2)}`}
          </span>
        </div>

        {/* Quick add button — appears on hover */}
        <motion.button
          initial={{ opacity: 0, height: 0, marginTop: -8 }}
          animate={hovered ? { opacity: 1, height: 38, marginTop: 0 } : { opacity: 0, height: 0, marginTop: -8 }}
          transition={{ duration: 0.15 }}
          className="w-full bg-[#111] text-white text-xs font-medium rounded-full overflow-hidden"
          onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
        >
          {product.price === 0 ? "Get for Free" : "Add to Cart"}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          fill={i <= Math.round(rating) ? "#e83b3b" : "none"}
          color={i <= Math.round(rating) ? "#e83b3b" : "#d1d1ce"}
        />
      ))}
    </div>
  );
}

// ─── Product Detail Modal ─────────────────────────────────────────────────────
function ProductModal({ product, onClose, onAddToCart }: {
  product: Product;
  onClose: () => void;
  onAddToCart: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-[640px] sm:mx-4 max-h-[90vh] overflow-y-auto z-10"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-6">
            <div />
            <button onClick={onClose} className="size-8 rounded-full bg-[#f5f5f3] flex items-center justify-center hover:bg-[#e5e5e2]">
              <X size={16} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            {/* Cover */}
            <div className="bg-[rgba(238,238,235,0.5)] rounded-2xl flex items-center justify-center py-8 px-4 shrink-0 sm:w-56">
              {product.cover}
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {product.badge && <Badge type={product.badge} />}
                <span className="inline-block px-3 py-1 rounded-full bg-[#f5f5f3] text-xs text-[#707070] ml-0" style={{ position: "static" }}>
                  {product.category}
                </span>
              </div>

              <h2
                className="text-[#111] text-2xl mb-2 leading-tight"
                style={{ fontFamily: "Forum, Georgia, serif" }}
              >
                {product.title}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-[13px] text-[#707070]">{product.rating} · {product.reviews} reviews</span>
              </div>

              <p className="text-[14px] text-[#707070] leading-6 mb-5">{product.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {product.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 bg-[#f5f5f3] rounded-full text-[11px] text-[#707070]">{t}</span>
                ))}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="text-[#e83b3b] text-4xl font-medium"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {product.price === 0 ? "Free" : `$${product.price.toFixed(2)}`}
                </span>
                <button
                  onClick={onAddToCart}
                  className="flex-1 min-w-[140px] bg-[#111] text-white text-sm font-medium py-3 px-6 rounded-full hover:bg-[#333] transition-colors"
                >
                  {product.price === 0 ? "Get for Free" : "Add to Cart"}
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-[#f0f0ee]">
                <p className="text-[12px] text-[#707070]">
                  Available as: {product.platforms.join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────
function CartDrawer({ items, onClose, onUpdate, onCheckout }: {
  items: CartItem[];
  onClose: () => void;
  onUpdate: (id: number, qty: number) => void;
  onCheckout: () => void;
}) {
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative bg-white w-full max-w-[400px] h-full flex flex-col shadow-2xl z-10"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 350 }}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#f0f0ee]">
          <h2 className="text-[18px] font-medium text-[#111]" style={{ fontFamily: "Forum, Georgia, serif" }}>
            Your Cart
          </h2>
          <button onClick={onClose} className="size-8 rounded-full bg-[#f5f5f3] flex items-center justify-center hover:bg-[#e5e5e2]">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <ShoppingCart size={40} className="text-[#e5e5e2]" />
              <p className="text-[#707070] text-sm">Your cart is empty.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 items-start">
                  <div className="bg-[rgba(238,238,235,0.5)] rounded-xl w-16 h-16 flex items-center justify-center overflow-hidden shrink-0">
                    <div className="scale-[0.4] origin-center">{item.product.cover}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] text-[#111] font-medium leading-5 mb-1">{item.product.title}</p>
                    <p className="text-[#e83b3b] text-sm font-medium">
                      {item.product.price === 0 ? "Free" : `$${item.product.price.toFixed(2)}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onUpdate(item.product.id, item.qty - 1)}
                      className="size-6 rounded-full bg-[#f5f5f3] flex items-center justify-center hover:bg-[#e5e5e2]"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-xs w-5 text-center">{item.qty}</span>
                    <button
                      onClick={() => onUpdate(item.product.id, item.qty + 1)}
                      className="size-6 rounded-full bg-[#f5f5f3] flex items-center justify-center hover:bg-[#e5e5e2]"
                    >
                      <Plus size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-[#f0f0ee]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-[#707070]">Total</span>
              <span className="text-[#111] font-medium text-lg">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-[#111] text-white text-sm font-medium py-3 rounded-full hover:bg-[#333] transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Checkout Modal ───────────────────────────────────────────────────────────
function CheckoutModal({ items, onClose, onSuccess }: {
  items: CartItem[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("success");
    setTimeout(onSuccess, 2400);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative bg-white rounded-2xl w-full max-w-[480px] mx-4 overflow-hidden z-10"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
      >
        {step === "form" ? (
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-[#111]" style={{ fontFamily: "Forum, Georgia, serif" }}>
                Checkout
              </h2>
              <button onClick={onClose} className="size-8 rounded-full bg-[#f5f5f3] flex items-center justify-center hover:bg-[#e5e5e2]">
                <X size={16} />
              </button>
            </div>

            <div className="bg-[#f5f5f3] rounded-xl p-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm py-1">
                  <span className="text-[#111]">{item.product.title} ×{item.qty}</span>
                  <span className="text-[#111] font-medium">
                    {item.product.price === 0 ? "Free" : `$${(item.product.price * item.qty).toFixed(2)}`}
                  </span>
                </div>
              ))}
              <div className="border-t border-[#e5e5e2] mt-3 pt-3 flex justify-between text-sm font-medium">
                <span>Total</span>
                <span className="text-[#e83b3b]">${total.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                required
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-[#e5e5e2] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#111] transition-colors bg-transparent"
              />
              <input
                required
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#e5e5e2] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#111] transition-colors bg-transparent"
              />
              <input
                required
                type="text"
                placeholder="Card number (demo)"
                value={card}
                onChange={(e) => setCard(e.target.value)}
                maxLength={19}
                className="w-full border border-[#e5e5e2] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#111] transition-colors bg-transparent"
              />
              <div className="flex gap-3">
                <input
                  required
                  type="text"
                  placeholder="MM / YY"
                  className="flex-1 border border-[#e5e5e2] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#111] transition-colors bg-transparent"
                />
                <input
                  required
                  type="text"
                  placeholder="CVC"
                  className="w-24 border border-[#e5e5e2] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#111] transition-colors bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#111] text-white text-sm font-medium py-3 rounded-full hover:bg-[#333] transition-colors mt-2"
              >
                Pay ${total.toFixed(2)}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-12 flex flex-col items-center text-center gap-4">
            <div className="size-16 bg-[#27c93f] rounded-full flex items-center justify-center mb-2">
              <Check size={28} color="white" strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-medium text-[#111]" style={{ fontFamily: "Forum, Georgia, serif" }}>
              Order complete!
            </h2>
            <p className="text-sm text-[#707070]">
              Your digital resources will arrive in your inbox shortly.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── About Section Component ──────────────────────────────────────────────────
function AboutSection({ onExplore }: { onExplore: () => void }) {
  const [activeTab, setActiveTab] = useState<"prompts" | "design" | "automation" | "vibe">("prompts");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [dispatchEmail, setDispatchEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleDispatchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (dispatchEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3500);
      setDispatchEmail("");
    }
  }

  const teamMembers = [
    {
      name: "Elena Rostova",
      role: "Lead Design Technologist & Token Architect",
      bio: "Former design systems lead specializing in tokenized UI architecture, generative Figma primitives, and multi-brand theme engines.",
      image: "https://images.unsplash.com/photo-1598016677484-ad34c3fd766e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      tag: "Design Systems",
    },
    {
      name: "Marcus Chen",
      role: "AI Prompt Engineer & Agent Skill Author",
      bio: "Crafts chain-of-thought prompt architectures and deterministic agent skills for LLM execution across Claude, GPT-4, and Gemini.",
      image: "https://images.unsplash.com/photo-1692355120033-a008cb7500f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      tag: "Agent Skills",
    },
    {
      name: "Aria Vance",
      role: "Workflow Automation Strategist",
      bio: "Builds fault-tolerant no-code automation blueprints, API connectors, and webhook orchestrations for high-throughput studios.",
      image: "https://images.unsplash.com/photo-1782292932736-0ee7f47ef851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      tag: "Automation",
    },
    {
      name: "Soren Thorne",
      role: "Founder & Vibe Coding Specialist",
      bio: "Pioneering natural language software composition, vibe coding directives, and accessible creator toolkits for independent builders.",
      image: "https://images.unsplash.com/photo-1692355120834-254b89b45819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      tag: "Vibe Coding",
    }
  ];

  const faqs = [
    {
      q: "What makes Bitify different from conventional template stores?",
      a: "We avoid generic, corporate boilerplate. Everything in Bitify is engineered as a modular system — engineered with exact taxonomy, structured data formats, reusable tokens, and battle-tested execution rubrics."
    },
    {
      q: "How do updates work for purchased toolkits and libraries?",
      a: "All purchases grant lifetime access to the resource repository. Whenever we publish an expanded v2 or patch an agent skill for a new model update, you receive instant Notion/Figma/PDF refresh notifications."
    },
    {
      q: "Can I use Bitify resources in commercial client work?",
      a: "Yes. All digital artifacts, vibe coding starter packs, and automation blueprints come with an unrestricted commercial license for client projects and studio work."
    },
    {
      q: "What tools do I need for the Vibe Coding starter guides?",
      a: "Our vibe coding directives are model-agnostic. They work seamlessly with Cursor, Windsurf, Claude Artifacts, ChatGPT, v0, Bolt, and custom agentic sandboxes."
    }
  ];

  return (
    <div className="w-full pb-24 animate-fadeIn">
      {/* ── Studio Banner Hero ── */}
      <section className="relative overflow-hidden pt-16 pb-20 px-6 lg:px-14 border-b border-[#f0f0ee] bg-[rgba(250,250,248,0.7)]">
        <div className="max-w-[1280px] mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111] text-white text-[11px] font-medium tracking-wide uppercase mb-8">
            <span className="size-1.5 rounded-full bg-[#e83b3b] animate-pulse" />
            Studio Manifesto · Est. 2024
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <h1
                className="text-[clamp(42px,6vw,92px)] text-[#111] tracking-[-1.5px] leading-[0.92] mb-8"
                style={{ fontFamily: "Forum, Georgia, serif", fontWeight: 400 }}
              >
                Crafting digital artifacts for the next wave of <span className="italic text-[#e83b3b]">creative engineering.</span>
              </h1>
              <p className="text-[17px] text-[#555] leading-relaxed max-w-[680px]">
                Bitify is an independent creative studio and digital resource laboratory. We publish structured prompt systems, design token frameworks, no-code playbooks, and vibe coding primitives built for designers, builders, and AI orchestrators who refuse generic output.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4 border-l border-[#e5e5e2] pl-6 lg:pl-8 py-2">
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-[#707070] uppercase tracking-wider">PRIMARY DIRECTIVE</span>
                <span className="text-[14px] text-[#111] font-medium mt-1">Curation as craft, systems over snippets.</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-[#707070] uppercase tracking-wider">SYSTEM ARCHITECTURE</span>
                <span className="text-[14px] text-[#111] font-medium mt-1">Prompt Packs · Design Kits · Automation · Vibe Coding</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-[#707070] uppercase tracking-wider">HEADQUARTERS</span>
                <span className="text-[14px] text-[#111] font-medium mt-1">Distributed Studio · Global Dispatch</span>
              </div>
              <button
                onClick={onExplore}
                className="mt-2 inline-flex items-center justify-between w-full bg-[#111] text-white text-xs font-medium py-3 px-5 rounded-full hover:bg-[#e83b3b] transition-colors group"
              >
                <span>Explore Studio Library</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Studio Statistics Band ── */}
      <section className="bg-[#111] text-white py-12 px-6 lg:px-14">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <span className="text-[clamp(32px,4vw,54px)] font-light text-[#e83b3b]" style={{ fontFamily: "Forum, Georgia, serif" }}>
              48,000+
            </span>
            <span className="text-xs text-[#aaa] font-medium uppercase tracking-wider mt-1">Artifacts Deployed</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[clamp(32px,4vw,54px)] font-light text-white" style={{ fontFamily: "Forum, Georgia, serif" }}>
              100%
            </span>
            <span className="text-xs text-[#aaa] font-medium uppercase tracking-wider mt-1">Open Modular Frameworks</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[clamp(32px,4vw,54px)] font-light text-white" style={{ fontFamily: "Forum, Georgia, serif" }}>
              12
            </span>
            <span className="text-xs text-[#aaa] font-medium uppercase tracking-wider mt-1">Curated System Editions</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[clamp(32px,4vw,54px)] font-light text-[#e83b3b]" style={{ fontFamily: "Forum, Georgia, serif" }}>
              4.9 / 5.0
            </span>
            <span className="text-xs text-[#aaa] font-medium uppercase tracking-wider mt-1">Creator Satisfaction</span>
          </div>
        </div>
      </section>

      {/* ── Our 4 Core System Pillars ── */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-14 py-20 border-b border-[#f0f0ee]">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono text-[#e83b3b] uppercase tracking-widest">01 / ARCHITECTURE</span>
            <h2 className="text-[clamp(32px,4vw,56px)] text-[#111] leading-none mt-2" style={{ fontFamily: "Forum, Georgia, serif" }}>
              Systematic Toolkits & Primitives
            </h2>
          </div>
          <p className="text-sm text-[#707070] max-w-[420px]">
            We build tools designed for maximum leverage. Select a system tier below to inspect our craftsmanship standards.
          </p>
        </div>

        {/* System tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8 bg-[#f5f5f3] p-1.5 rounded-2xl">
          {[
            { id: "prompts", label: "Prompt Systems", icon: <Terminal size={14} /> },
            { id: "design", label: "Design Kits", icon: <Layers size={14} /> },
            { id: "automation", label: "Automation Playbooks", icon: <Cpu size={14} /> },
            { id: "vibe", label: "Vibe Coding Guides", icon: <Zap size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white text-[#111] shadow-sm font-semibold"
                  : "text-[#707070] hover:text-[#111]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === "prompts" && (
            <motion.div
              key="prompts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#fcfcfb] border border-[#e5e5e2] rounded-2xl p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7">
                <span className="px-3 py-1 bg-[#111] text-white text-[10px] font-mono rounded-full uppercase tracking-wider">
                  Tier 01 · Prompt Engineering
                </span>
                <h3 className="text-3xl text-[#111] mt-4 mb-3" style={{ fontFamily: "Forum, Georgia, serif" }}>
                  Contextual Prompt Systems & Evaluation Rubrics
                </h3>
                <p className="text-sm text-[#666] leading-relaxed mb-6">
                  Engineered for product managers, researchers, and designers. Our prompts use structured variable bindings, system persona constraints, and chain-of-thought protocols to yield deterministic outputs from any frontier LLM.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["200+ Categorized Prompts", "Claude & GPT-4 Optimized", "Notion & PDF Export", "Zero Hallucination Taxonomies"].map((feat) => (
                    <span key={feat} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#e5e5e2] text-xs text-[#111] rounded-full">
                      <Check size={12} className="text-[#e83b3b]" />
                      {feat}
                    </span>
                  ))}
                </div>
                <button onClick={onExplore} className="text-xs font-medium text-[#111] underline hover:text-[#e83b3b]">
                  View Prompt Systems in Library →
                </button>
              </div>
              <div className="lg:col-span-5 bg-[#111] text-[#27c93f] p-6 rounded-xl font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
                <div className="text-[#707070] mb-2">// Sample Prompt Architecture v2.4</div>
                <span className="text-[#e83b3b]">SYSTEM_PROMPT</span> {"{\n"}
                {"  "}persona: <span className="text-white">"Senior Product Architect"</span>,{"\n"}
                {"  "}output_format: <span className="text-white">"Strict JSON Schema"</span>,{"\n"}
                {"  "}constraints: [<span className="text-white">"No conversational filler"</span>, <span className="text-white">"Include edge cases"</span>]{"\n"}
                {"}"}
              </div>
            </motion.div>
          )}

          {activeTab === "design" && (
            <motion.div
              key="design"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#fcfcfb] border border-[#e5e5e2] rounded-2xl p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7">
                <span className="px-3 py-1 bg-[#111] text-white text-[10px] font-mono rounded-full uppercase tracking-wider">
                  Tier 02 · Design Tokens & UI Kits
                </span>
                <h3 className="text-3xl text-[#111] mt-4 mb-3" style={{ fontFamily: "Forum, Georgia, serif" }}>
                  Token-First Component Engines & Figma Libraries
                </h3>
                <p className="text-sm text-[#666] leading-relaxed mb-6">
                  Design systems built for velocity. Includes complete Figma component variable setups, Tailwind CSS token contracts, auto-layout variants, and accessibility-checked color scales.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Figma Variables & Styles", "Tailwind v4 Token Compatibility", "200+ Responsive Components", "Dark/Light Ground Mapping"].map((feat) => (
                    <span key={feat} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#e5e5e2] text-xs text-[#111] rounded-full">
                      <Check size={12} className="text-[#e83b3b]" />
                      {feat}
                    </span>
                  ))}
                </div>
                <button onClick={onExplore} className="text-xs font-medium text-[#111] underline hover:text-[#e83b3b]">
                  View Design Kits in Library →
                </button>
              </div>
              <div className="lg:col-span-5 bg-[#f0ede8] p-6 rounded-xl border border-[#e5e5e2]">
                <div className="text-xs font-mono text-[#707070] uppercase mb-3">TOKEN PREVIEW</div>
                <div className="flex gap-2 mb-3">
                  <div className="h-10 flex-1 bg-[#111] rounded-md flex items-center justify-center text-[10px] text-white">#111111</div>
                  <div className="h-10 flex-1 bg-[#e83b3b] rounded-md flex items-center justify-center text-[10px] text-white">#E83B3B</div>
                  <div className="h-10 flex-1 bg-[#f5f5f3] border border-[#d0d0ce] rounded-md flex items-center justify-center text-[10px] text-[#111]">#F5F5F3</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#e5e5e2] text-xs font-mono text-[#444]">
                  @theme inline &#123; --color-brand: #e83b3b; &#125;
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "automation" && (
            <motion.div
              key="automation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#fcfcfb] border border-[#e5e5e2] rounded-2xl p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7">
                <span className="px-3 py-1 bg-[#111] text-white text-[10px] font-mono rounded-full uppercase tracking-wider">
                  Tier 03 · Workflow Automation
                </span>
                <h3 className="text-3xl text-[#111] mt-4 mb-3" style={{ fontFamily: "Forum, Georgia, serif" }}>
                  No-Code Stacks, Zapier & Make Blueprints
                </h3>
                <p className="text-sm text-[#666] leading-relaxed mb-6">
                  Turn repetitive operations into autonomous pipelines. Importable JSON blueprints for Make, Zapier, and n8n that handle lead triage, content distribution, and automated invoice delivery.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["40+ Importable Scenarios", "Built-In Retry Logic", "Webhook Integration Guides", "Zero Coding Required"].map((feat) => (
                    <span key={feat} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#e5e5e2] text-xs text-[#111] rounded-full">
                      <Check size={12} className="text-[#e83b3b]" />
                      {feat}
                    </span>
                  ))}
                </div>
                <button onClick={onExplore} className="text-xs font-medium text-[#111] underline hover:text-[#e83b3b]">
                  View Automation Playbooks in Library →
                </button>
              </div>
              <div className="lg:col-span-5 bg-white border border-[#e5e5e2] p-6 rounded-xl flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 bg-[#f5f5f3] rounded-lg">
                  <div className="size-8 rounded-full bg-[#111] text-white flex items-center justify-center text-xs font-mono">01</div>
                  <div className="text-xs">
                    <p className="font-semibold text-[#111]">Webhook Listener</p>
                    <p className="text-[#707070]">Captures incoming payload</p>
                  </div>
                </div>
                <div className="h-4 w-0.5 bg-[#e83b3b] ml-7" />
                <div className="flex items-center gap-3 p-3 bg-[#e83b3b]/10 border border-[#e83b3b]/20 rounded-lg">
                  <div className="size-8 rounded-full bg-[#e83b3b] text-white flex items-center justify-center text-xs font-mono">02</div>
                  <div className="text-xs">
                    <p className="font-semibold text-[#111]">AI Agent Transformation</p>
                    <p className="text-[#e83b3b] font-medium">Summarizes & formats</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "vibe" && (
            <motion.div
              key="vibe"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#fcfcfb] border border-[#e5e5e2] rounded-2xl p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7">
                <span className="px-3 py-1 bg-[#111] text-white text-[10px] font-mono rounded-full uppercase tracking-wider">
                  Tier 04 · Vibe Coding Primitives
                </span>
                <h3 className="text-3xl text-[#111] mt-4 mb-3" style={{ fontFamily: "Forum, Georgia, serif" }}>
                  Natural Language Software Directives & Starter Sets
                </h3>
                <p className="text-sm text-[#666] leading-relaxed mb-6">
                  Skip the boilerplate and compose entire user interfaces and full-stack features through natural language directives. Specially optimized for Cursor, Windsurf, Claude, and AI sandboxes.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["80+ Starter Prompt Rules", "State & UI Directives", "React & Svelte Scaffolding", "Natural Language API Specs"].map((feat) => (
                    <span key={feat} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#e5e5e2] text-xs text-[#111] rounded-full">
                      <Check size={12} className="text-[#e83b3b]" />
                      {feat}
                    </span>
                  ))}
                </div>
                <button onClick={onExplore} className="text-xs font-medium text-[#111] underline hover:text-[#e83b3b]">
                  View Vibe Coding Guides in Library →
                </button>
              </div>
              <div className="lg:col-span-5 bg-[#111] text-white p-6 rounded-xl flex flex-col justify-between h-48 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-[10px] font-mono text-[#e83b3b] uppercase">DIRECTIVE RULESET</span>
                  <p className="text-xl font-light mt-2" style={{ fontFamily: "Forum, Georgia, serif" }}>
                    "Build a responsive card grid with soft spring animations and hairline dividers."
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#888] relative z-10 border-t border-[#333] pt-3">
                  <span>Status: Ready to Execute</span>
                  <span className="text-[#27c93f]">100% Match</span>
                </div>
                <div className="absolute -bottom-10 -right-10 size-32 rounded-full bg-[#e83b3b]/20 blur-2xl pointer-events-none" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Studio Ethos / 01 to 04 Principles ── */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-14 py-20 border-b border-[#f0f0ee]">
        <div className="mb-12">
          <span className="text-xs font-mono text-[#e83b3b] uppercase tracking-widest">02 / MANIFESTO</span>
          <h2 className="text-[clamp(32px,4vw,56px)] text-[#111] leading-none mt-2" style={{ fontFamily: "Forum, Georgia, serif" }}>
            The Four Pillars of Studio Craft
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-[#f5f5f3] rounded-2xl border border-[#e5e5e2] flex flex-col justify-between hover:border-[#111] transition-colors">
            <div>
              <span className="text-2xl font-light text-[#e83b3b]" style={{ fontFamily: "Forum, Georgia, serif" }}>01 /</span>
              <h3 className="text-xl font-medium text-[#111] mt-2 mb-3">Signal Over Noise</h3>
              <p className="text-sm text-[#666] leading-relaxed">
                In an era flooded with generic AI output, true value lies in thoughtful curation. Every prompt, token, and playbook in our library undergoes multi-stage studio testing before publication.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e5e5e2] text-[11px] font-mono text-[#707070]">
              VERIFIED CRAFT STANDARD
            </div>
          </div>

          <div className="p-8 bg-[#f5f5f3] rounded-2xl border border-[#e5e5e2] flex flex-col justify-between hover:border-[#111] transition-colors">
            <div>
              <span className="text-2xl font-light text-[#111]" style={{ fontFamily: "Forum, Georgia, serif" }}>02 /</span>
              <h3 className="text-xl font-medium text-[#111] mt-2 mb-3">Non-Corporate Terminology</h3>
              <p className="text-sm text-[#666] leading-relaxed">
                We reject "enterprise buzzwords." We build libraries, toolkits, playbooks, and vibe coding primitives — designed specifically for independent creators, design technologists, and digital craftspeople.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e5e5e2] text-[11px] font-mono text-[#707070]">
              CREATOR-FIRST LEXICON
            </div>
          </div>

          <div className="p-8 bg-[#f5f5f3] rounded-2xl border border-[#e5e5e2] flex flex-col justify-between hover:border-[#111] transition-colors">
            <div>
              <span className="text-2xl font-light text-[#111]" style={{ fontFamily: "Forum, Georgia, serif" }}>03 /</span>
              <h3 className="text-xl font-medium text-[#111] mt-2 mb-3">Ergonomics of Intent</h3>
              <p className="text-sm text-[#666] leading-relaxed">
                Artificial intelligence is not a replacement for human taste. Our resources focus on amplifying creative intent, reducing setup friction, and giving you total control over the finished product.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e5e5e2] text-[11px] font-mono text-[#707070]">
              HUMAN-CENTERED AI
            </div>
          </div>

          <div className="p-8 bg-[#f5f5f3] rounded-2xl border border-[#e5e5e2] flex flex-col justify-between hover:border-[#111] transition-colors">
            <div>
              <span className="text-2xl font-light text-[#e83b3b]" style={{ fontFamily: "Forum, Georgia, serif" }}>04 /</span>
              <h3 className="text-xl font-medium text-[#111] mt-2 mb-3">Perpetual Ownership</h3>
              <p className="text-sm text-[#666] leading-relaxed">
                No endless monthly subscriptions or restrictive paywalls. Buy once, download forever, and deploy across as many commercial or personal projects as your creativity demands.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e5e5e2] text-[11px] font-mono text-[#707070]">
              LIFETIME ACCESS
            </div>
          </div>
        </div>
      </section>

      {/* ── Studio Team Collective ── */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-14 py-20 border-b border-[#f0f0ee]">
        <div className="mb-12">
          <span className="text-xs font-mono text-[#e83b3b] uppercase tracking-widest">03 / THE COLLECTIVE</span>
          <h2 className="text-[clamp(32px,4vw,56px)] text-[#111] leading-none mt-2" style={{ fontFamily: "Forum, Georgia, serif" }}>
            Meet the Studio Architects
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white border border-[#e5e5e2] rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition-shadow group">
              <div>
                <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-[#f5f5f3]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#111]/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full">
                    {member.tag}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-[#111] leading-snug">{member.name}</h3>
                <p className="text-xs font-mono text-[#e83b3b] mb-3">{member.role}</p>
                <p className="text-xs text-[#707070] leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Studio FAQ Accordion ── */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-14 py-20 border-b border-[#f0f0ee]">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-[#e83b3b] uppercase tracking-widest">04 / DISPATCH FAQ</span>
            <h2 className="text-[clamp(32px,4vw,52px)] text-[#111] mt-2" style={{ fontFamily: "Forum, Georgia, serif" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-[#e5e5e2] rounded-xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-medium text-sm text-[#111] hover:bg-[#fcfcfb] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#707070] transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 pt-1 text-xs text-[#666] leading-relaxed border-t border-[#f5f5f3]"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter Dispatch CTA ── */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-14 pt-16">
        <div className="bg-[#111] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-[540px]">
            <span className="text-xs font-mono text-[#e83b3b] uppercase tracking-widest">STUDIO DISPATCH</span>
            <h2 className="text-[clamp(28px,3.5vw,46px)] text-white mt-2 mb-3 leading-tight" style={{ fontFamily: "Forum, Georgia, serif" }}>
              Subscribe to Field Notes & System Drops
            </h2>
            <p className="text-xs text-[#aaa] leading-relaxed">
              Join 20,000+ designers and vibe coders receiving our bi-weekly breakdown of prompt architectures, AI ergonomics, and digital resource drops.
            </p>
          </div>

          <form onSubmit={handleDispatchSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              required
              type="email"
              placeholder="Enter your email address"
              value={dispatchEmail}
              onChange={(e) => setDispatchEmail(e.target.value)}
              className="bg-[#222] border border-[#333] text-white placeholder-[#707070] text-xs px-5 py-3.5 rounded-full outline-none focus:border-[#e83b3b] transition-colors w-full sm:w-72"
            />
            <button
              type="submit"
              className="bg-[#e83b3b] text-white text-xs font-medium px-6 py-3.5 rounded-full hover:bg-white hover:text-[#111] transition-colors whitespace-nowrap"
            >
              {subscribed ? "Subscribed!" : "Join Dispatch"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function FooterLogo() {
  return (
    <img src={logo} alt="Bitify" className="h-6 w-auto" />
  );
}

function FooterLinkColumn({ title, links }: { title: string; links: { label: string; onClick?: () => void }[] }) {
  return (
    <div className="flex flex-col">
      <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#111] mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
        {title}
      </h4>
      <ul className="flex flex-col gap-2.5">
        {links.map(({ label, onClick }) => (
          <li key={label}>
            {onClick ? (
              <button
                onClick={onClick}
                className="text-[13px] text-[#555] hover:text-[#111] transition-colors text-left"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {label}
              </button>
            ) : (
              <span className="text-[13px] text-[#555] cursor-default" style={{ fontFamily: "Inter, sans-serif" }}>
                {label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SiteFooter({ onNav, onSelectCategory }: { onNav: (nav: string) => void; onSelectCategory: (cat: Category) => void }) {
  const socials = [
    { icon: <Instagram size={15} />, label: "Instagram" },
    { icon: <Linkedin size={15} />, label: "LinkedIn" },
    { icon: <Youtube size={15} />, label: "YouTube" },
    { icon: <Twitter size={15} />, label: "X / Twitter" },
  ];

  return (
    <footer className="relative overflow-hidden px-4 sm:px-6 lg:px-10 pt-10 pb-6">
      <div
        className="relative max-w-[1280px] mx-auto rounded-[24px] bg-[#f3f2f0] px-8 sm:px-12 pt-12 pb-40 sm:pb-40 lg:pb-10 flex flex-col"
      >
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-8">
          {/* Brand block */}
          <div className="relative z-10 lg:w-1/3 shrink-0">
            <button
              onClick={() => onNav("Discover")}
              className="focus:outline-none"
              aria-label="Bitify home"
            >
              <FooterLogo />
            </button>
            <p className="mt-5 max-w-[260px] text-[13px] leading-6 text-[#555]" style={{ fontFamily: "Inter, sans-serif" }}>
              Structured prompt systems, design toolkits, and vibe-coding primitives for creative builders.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 lg:flex-1 lg:max-w-[560px] relative z-10">
            <FooterLinkColumn
              title="Our Studio"
              links={[
                { label: "About", onClick: () => onNav("About") },
                { label: "Blog", onClick: () => onNav("About") },
                { label: "Careers", onClick: () => onNav("About") },
                { label: "Newsroom", onClick: () => onNav("About") },
              ]}
            />
            <FooterLinkColumn
              title="Products"
              links={[
                { label: "Prompt Packs", onClick: () => onSelectCategory("Prompt Packs") },
                { label: "Design Kits", onClick: () => onSelectCategory("Design Kits") },
                { label: "Automation Guides", onClick: () => onSelectCategory("Automation") },
                { label: "Agent Skills", onClick: () => onSelectCategory("Agent Skills") },
              ]}
            />
            <FooterLinkColumn
              title="Support"
              links={[
                { label: "FAQs", onClick: () => onNav("About") },
                { label: "Contact", onClick: () => onNav("About") },
                { label: "Help Center", onClick: () => onNav("About") },
              ]}
            />
          </div>
        </div>

        {/* Illustration — anchored bottom-left, fully inside the footer */}
        <img
          src={footerIllustration}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute left-0 bottom-0 w-[220px] sm:w-[260px] lg:w-[320px] max-w-[48vw] z-0"
        />

        {/* Bottom row — pinned to the bottom of the footer */}
        <div className="relative z-10 mt-auto pt-12 flex flex-col sm:flex-row items-start sm:items-end sm:justify-between gap-5 lg:pl-80">
          <p className="text-[12px] text-[#555]" style={{ fontFamily: "Inter, sans-serif" }}>
            © 2026 Bitify. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <button
                key={s.label}
                type="button"
                aria-label={s.label}
                className="size-8 rounded-full border border-[#d8d6d3] text-[#333] flex items-center justify-center hover:bg-[#111] hover:text-white hover:border-[#111] transition-colors"
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sortBy, setSortBy] = useState<SortKey>("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("Discover");
  const [addedId, setAddedId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const PAGE_SIZE = 6;

  const sortRef = useRef<HTMLDivElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory, sortBy, searchQuery]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const t = e.target as Node;
      if (sortRef.current && !sortRef.current.contains(t)) setSortOpen(false);
      if (searchWrapRef.current && !searchWrapRef.current.contains(t)) setSearchOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  function addToCart(product: Product) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  }

  function updateCart(id: number, qty: number) {
    if (qty <= 0) setCartItems((prev) => prev.filter((i) => i.product.id !== id));
    else setCartItems((prev) => prev.map((i) => i.product.id === id ? { ...i, qty } : i));
  }

  const filtered = PRODUCTS.filter((p) => {
    if (activeCategory !== "All" && p.category !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "newest") return (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0);
    return 0;
  });

  const sortLabels: Record<SortKey, string> = {
    featured: "Featured",
    "price-asc": "Price: Low → High",
    "price-desc": "Price: High → Low",
    newest: "Newest First",
  };

  const navItems = ["Discover", "About"];

  return (
    <div className="bg-white min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#f0f0ee]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-14 py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <BitifyLogo onClick={() => { setActiveNav("Discover"); setMobileNavOpen(false); }} />

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                  activeNav === item ? "bg-[#e5e5e2] text-[#111]" : "text-[#111] hover:bg-[#f5f5f3]"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative" ref={searchWrapRef}>
              <AnimatePresence>
                {searchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="absolute right-10 top-0 h-9 border border-[#e5e5e2] rounded-full px-4 text-sm outline-none bg-white"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setSearchOpen(false);
                        setSearchQuery("");
                      }
                    }}
                    autoFocus
                  />
                )}
              </AnimatePresence>
              <button
                onClick={() => { setSearchOpen((s) => !s); if (searchOpen) setSearchQuery(""); }}
                className="relative z-10 size-9 rounded-full border border-[#e5e5e2] bg-white flex items-center justify-center hover:bg-[#f5f5f3]"
              >
                <Search size={15} color="#111" />
              </button>
            </div>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="size-9 rounded-full border border-[#e5e5e2] bg-white flex items-center justify-center hover:bg-[#f5f5f3] relative"
            >
              <Bookmark size={15} color="#111" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 size-4 bg-[#e83b3b] text-white text-[9px] font-medium rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="hidden sm:flex bg-[#111] text-white text-[12px] font-medium px-4 py-2.5 rounded-full items-center gap-2 hover:bg-[#333] transition-colors"
            >
              <ShoppingCart size={13} />
              {cartCount > 0 ? `Cart (${cartCount})` : "Log In"}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileNavOpen((o) => !o)}
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
              className="md:hidden size-9 rounded-full border border-[#e5e5e2] bg-white flex items-center justify-center hover:bg-[#f5f5f3]"
            >
              {mobileNavOpen ? <X size={15} color="#111" /> : <Menu size={15} color="#111" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="md:hidden overflow-hidden border-b border-[#f0f0ee] bg-white"
              aria-label="Mobile navigation"
            >
              <div className="max-w-[1280px] mx-auto px-6 py-3 flex flex-col">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setActiveNav(item);
                      setMobileNavOpen(false);
                    }}
                    className={`px-3 py-3 rounded-full text-left text-[13px] font-medium transition-colors ${
                      activeNav === item ? "text-[#111]" : "text-[#707070] hover:text-[#111]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ── Main View Switching ── */}
      <main className="flex-1">
        {activeNav === "About" ? (
          <AboutSection onExplore={() => setActiveNav("Discover")} />
        ) : (
          <div>
            {/* Hero */}
            <div className="flex flex-col items-center px-6 pt-20 pb-0">
              <div className="text-center relative">
                <h1
                  className="text-[clamp(52px,9vw,128px)] text-[#111] tracking-[-1.5px] leading-[0.85] mb-0"
                  style={{ fontFamily: "Forum, Georgia, serif", fontWeight: 400 }}
                >
                  Discover curated
                </h1>
                <p
                  className="text-[clamp(22px,3.5vw,48px)] text-[#111] leading-tight"
                  style={{ fontFamily: "Forum, Georgia, serif", fontWeight: 400 }}
                >
                  resources for every creator.
                </p>
              </div>

              <div className="relative -mt-8 sm:-mt-16">
                <img
                  src={booksImg}
                  alt="Curated resource library"
                  className="w-full max-w-[615px] object-contain pointer-events-none"
                  style={{ maxHeight: 344 }}
                />
              </div>

              <p className="text-[#707070] text-sm text-center max-w-[520px] -mt-4 sm:-mt-8">
                Explorations into design, AI, and automation, and the art of thoughtful curation.
              </p>
            </div>

            {/* ── Filters + Grid ── */}
            <div className="max-w-[1280px] mx-auto px-6 lg:px-14">
              {/* Filter bar */}
              <div className="flex items-center justify-between pt-14 pb-6 gap-4 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[12px] font-medium transition-colors ${
                        activeCategory === cat
                          ? "bg-[#e5e5e2] text-[#111]"
                          : "bg-white border border-[#e5e5e2] text-[#111] hover:bg-[#f5f5f3]"
                      }`}
                    >
                      <CategoryIcon category={cat} />
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Sort */}
                <div className="relative" ref={sortRef}>
                  <button
                    onClick={() => setSortOpen((s) => !s)}
                    className="flex items-center gap-1.5 text-[12px] text-[#555] hover:text-[#111] transition-colors"
                  >
                    {sortLabels[sortBy]}
                    <ChevronDown size={12} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {sortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="absolute right-0 top-8 bg-white border border-[#e5e5e2] rounded-xl shadow-lg py-1 w-48 z-20"
                      >
                        {(Object.entries(sortLabels) as [SortKey, string][]).map(([key, label]) => (
                          <button
                            key={key}
                            onClick={() => { setSortBy(key); setSortOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-[12px] hover:bg-[#f5f5f3] transition-colors flex items-center justify-between ${sortBy === key ? "text-[#111] font-medium" : "text-[#707070]"}`}
                          >
                            {label}
                            {sortBy === key && <Check size={12} />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Product grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {filtered.slice(0, visibleCount).map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                    >
                      <ProductCard
                        product={product}
                        onSelect={() => setSelectedProduct(product)}
                        onAddToCart={() => addToCart(product)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filtered.length === 0 && (
                  <div className="col-span-3 py-20 text-center">
                    <p className="text-[#707070] text-sm mb-3">No resources found.</p>
                    <button
                      onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                      className="text-[12px] text-[#111] border border-[#e5e5e2] rounded-full px-4 py-2 hover:bg-[#f5f5f3] transition-colors"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>

              {visibleCount < filtered.length && (
                <div className="flex justify-center mt-14 pb-20">
                  <button
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 border border-[#e5e5e2] text-[#111] text-xs font-medium py-3 px-6 rounded-full hover:bg-[#111] hover:text-white transition-colors"
                  >
                    Load More
                    <ChevronDown size={14} className="rotate-180" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <SiteFooter
        onNav={(nav) => { setActiveNav(nav); setMobileNavOpen(false); }}
        onSelectCategory={(cat) => { setActiveCategory(cat); setActiveNav("Discover"); }}
      />

      {/* ── Add to cart toast ── */}
      <AnimatePresence>
        {addedId !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#111] text-white text-sm font-medium px-5 py-3 rounded-full shadow-xl z-50 flex items-center gap-2"
          >
            <Check size={14} />
            Added to cart
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sort overlay close ── */}
      {sortOpen && <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />}

      {/* ── Overlays ── */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            items={cartItems}
            onClose={() => setCartOpen(false)}
            onUpdate={updateCart}
            onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkoutOpen && (
          <CheckoutModal
            items={cartItems}
            onClose={() => setCheckoutOpen(false)}
            onSuccess={() => {
              setCartItems([]);
              setCheckoutOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
