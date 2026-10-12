'use client';

import * as React from 'react';
import { GlassButton } from '@/components/ui/glass-button';
import { MessageCircle, Mail, MapPin } from 'lucide-react';

export default function MorphButtonIconsDemo() {
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const handleAction = (id: string) => {
    setLoadingId(id);
    if (id === 'mail') {
      const subject = encodeURIComponent("Inquiry - AbhiWorks");
      const body = encodeURIComponent("Hi AbhiWorks,\n\nI'm interested in your services and would love to connect.\n\nBest regards,");
      const mailtoUrl = `mailto:abhiiworkss@gmail.com?subject=${subject}&body=${body}`;
      try {
        const link = document.createElement('a');
        link.href = mailtoUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch {
        window.location.href = mailtoUrl;
      }
      setTimeout(() => setLoadingId(null), 1000);
      return;
    }
    if (id === 'location') {
      const locationUrl = 'https://maps.app.goo.gl/fv9AfXYhgVsEdyk19';
      try {
        const link = document.createElement('a');
        link.href = locationUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch {
        window.location.href = locationUrl;
      }
      setTimeout(() => setLoadingId(null), 1000);
      return;
    }
    if (id === 'send') {
      const message = "Hi AbhiWorks! I'm interested in your services and would love to discuss how you can help my business grow. Could we connect?";
      const whatsappUrl = `https://wa.me/918247338613?text=${encodeURIComponent(message)}`;
      try {
        const link = document.createElement('a');
        link.href = whatsappUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch {
        window.location.href = whatsappUrl;
      }
      setTimeout(() => setLoadingId(null), 1000);
      return;
    }
    if (id === 'share') {
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({
          title: 'AbhiWorks',
          text: 'Check out AbhiWorks portfolio',
          url: window.location.href,
        }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).catch(() => {});
      }
      setTimeout(() => setLoadingId(null), 1200);
      return;
    }
    setTimeout(() => setLoadingId(null), 2000);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 p-8 @container">
      {/* 
        NOTE: This layout uses container queries (@sm). 
        For this to work in your own application, the parent element of this component 
        must have the Tailwind CSS class "@container".
      */}
      <div className="flex w-full max-w-xl flex-row flex-wrap items-center justify-center gap-3 sm:gap-6">
        <GlassButton
          size="sm"
          onClick={() => handleAction('mail')}
          title="Send Email to abhiiworkss@gmail.com"
          contentClassName="flex items-center gap-2 text-xs sm:text-sm font-medium"
        >
          <Mail className="h-4 w-4 text-sky-400 shrink-0" />
          <span>Mail</span>
        </GlassButton>
        
        <GlassButton
          size="sm"
          onClick={() => handleAction('location')}
          title="Open Location on Google Maps"
          contentClassName="flex items-center gap-2 text-xs sm:text-sm font-medium"
        >
          <MapPin className="h-4 w-4 text-rose-400 shrink-0" />
          <span>Location</span>
        </GlassButton>

        <GlassButton
          size="sm"
          onClick={() => handleAction('send')}
          title="Chat on WhatsApp (+91 8247338613)"
          contentClassName="flex items-center gap-2 text-xs sm:text-sm font-medium"
        >
          <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Chat on WhatsApp</span>
        </GlassButton>
      </div>
    </div>
  );
}
