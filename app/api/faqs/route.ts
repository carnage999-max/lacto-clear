import { NextResponse } from 'next/server';
import { getEnabledFAQs } from '@/lib/database';

// Fallback FAQs for when database isn't available
const fallbackFAQs = [
  { id: 1, category: 'core', question: 'What is LactoClear® Core?', answer: 'LactoClear® Core is the foundation of our two-step protocol. It is designed to break down excess lactate accumulation and dismantle the protective barrier that blocks recovery pathways.', color: '#00D036', sort_order: 1 },
  { id: 2, category: 'core', question: 'How do I take Core?', answer: 'Follow the dosing instructions on the product label or as directed by your healthcare professional. Core is typically taken before MitoFuel for optimal results.', color: '#00D036', sort_order: 2 },
  { id: 3, category: 'mitofuel', question: 'What is MitoFuel®?', answer: 'MitoFuel® is the activation phase of the LactoClear® system. It reactivates mitochondrial function and accelerates metabolic recovery once the lactate barrier has been cleared by Core.', color: '#FF7A00', sort_order: 3 },
  { id: 4, category: 'mitofuel', question: 'Can I take MitoFuel without Core?', answer: 'While MitoFuel can be taken alone, it works best when combined with Core as part of the complete LactoClear® system. Core clears the pathway, allowing MitoFuel to work more effectively.', color: '#FF7A00', sort_order: 4 },
  { id: 5, category: 'nasal', question: 'What are the LactoClear® Nasal Sprays?', answer: 'The LactoClear® nasal sprays provide targeted delivery for faster action. They complement the oral system and offer an alternative delivery method for those who prefer nasal administration.', color: '#00A3E8', sort_order: 5 },
  { id: 6, category: 'nasal', question: 'How do I use the nasal sprays?', answer: 'Follow the instructions on the product label. Generally, nasal sprays are administered directly into each nostril. Do not exceed the recommended dosage.', color: '#00A3E8', sort_order: 6 },
  { id: 7, category: 'general', question: 'How long does it take to see results?', answer: 'Results vary by individual. Some people notice changes within days, while others may take several weeks. Consistency is key for optimal results.', color: '#FFFFFF', sort_order: 7 },
  { id: 8, category: 'general', question: 'Is LactoClear® safe?', answer: 'LactoClear® products are formulated with quality ingredients. However, we recommend consulting with your healthcare professional before starting any new supplement regimen, especially if you have existing health conditions or take medications.', color: '#FFFFFF', sort_order: 8 },
  { id: 9, category: 'general', question: 'Can I take LactoClear® with other supplements?', answer: 'In most cases, yes. However, we recommend consulting with your healthcare professional to ensure there are no interactions with your current supplement or medication regimen.', color: '#FFFFFF', sort_order: 9 },
  { id: 10, category: 'general', question: 'What if I miss a dose?', answer: 'If you miss a dose, take it as soon as you remember. If it\'s close to your next scheduled dose, skip the missed dose and resume your normal schedule. Do not double up on doses.', color: '#FFFFFF', sort_order: 10 },
];

export async function GET() {
  try {
    let faqs;
    
    try {
      faqs = getEnabledFAQs();
      
      // If we got FAQs from DB, use them
      if (faqs.length > 0) {
        return NextResponse.json(faqs);
      }
    } catch (dbError) {
      console.log('Database not available, using fallback FAQs');
    }
    
    // Use fallback FAQs
    return NextResponse.json(fallbackFAQs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    // Return fallback FAQs even on error
    return NextResponse.json(fallbackFAQs);
  }
}
