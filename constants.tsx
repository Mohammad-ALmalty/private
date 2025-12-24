
import React from 'react';
import { Heart, Stars, Gift, Camera, BookHeart, Sparkles } from 'lucide-react';
import { LoveReason, Memory } from './types';

export const REASONS: LoveReason[] = [
  { id: 1, text: "ابتسامتك التي تضيء عالمي", icon: "💖" },
  { id: 2, text: "قلبك الطيب الذي يسع الجميع", icon: "✨" },
  { id: 3, text: "ذكاؤك وروحك المرحة", icon: "🌹" },
  { id: 4, text: "طريقة اهتمامك بأدق التفاصيل", icon: "🌙" },
  { id: 5, text: "لأنكِ تجعلينني شخصاً أفضل", icon: "🦋" },
  { id: 6, text: "ببساطة.. لأنكِ أنتِ", icon: "💍" }
];

// تم إفراغ الصور الافتراضية بناءً على طلبك لتظهر مشاعرك في حالة عدم وجود صور
export const MEMORIES: Memory[] = [];

export const NAV_ITEMS = [
  { id: 'home', label: 'الرئيسية', icon: <Heart className="w-5 h-5" /> },
  { id: 'ai-writer', label: 'رسالة خاصة', icon: <BookHeart className="w-5 h-5" /> },
  { id: 'gallery', label: 'ذكرياتنا', icon: <Camera className="w-5 h-5" /> },
  { id: 'reasons', label: 'لماذا أحبك؟', icon: <Sparkles className="w-5 h-5" /> },
];
