'use client';

import React, { useState } from 'react';
import DemoBar from './DemoBar';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '@/components/store/CartDrawer';
import ToastContainer from '@/components/ui/ToastContainer';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-brand selection:text-black">
      <DemoBar />
      <Navbar onOpenCart={() => setCartOpen(true)} />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <ToastContainer />
    </div>
  );
}
