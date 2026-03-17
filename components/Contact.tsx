'use client';

import { Phone, Mail, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'motion/react';

export function Contact() {
  return (
    <section className="py-20 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-slate-900">Get in Touch</h2>
          <p className="text-sm text-slate-500 mt-2">We&apos;d love to hear from you. Let&apos;s build something great together.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-violet-100 text-violet-600 rounded-lg">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Phone</p>
                    <p className="text-slate-600 text-sm mt-1">+62 812 2943 8668</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-violet-100 text-violet-600 rounded-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Email</p>
                    <p className="text-slate-600 text-sm mt-1">hello@skanilantech.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-violet-100 text-violet-600 rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Office Location</p>
                    <p className="text-slate-600 text-sm mt-1">
                      Jl. Peterongansari No.2, Peterongan, Kec. Semarang Sel., <br />
                      Kota Semarang, Jawa Tengah 50242
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="font-medium text-slate-900 mb-4">Follow Us</p>
                <div className="flex gap-4">
                  <a href="#" className="p-2 bg-slate-100 text-slate-600 hover:bg-violet-600 hover:text-white rounded-lg transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2 bg-slate-100 text-slate-600 hover:bg-violet-600 hover:text-white rounded-lg transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2 bg-slate-100 text-slate-600 hover:bg-violet-600 hover:text-white rounded-lg transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map Integration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] lg:h-auto rounded-2xl overflow-hidden shadow-sm border border-slate-100"
          >
            {/* Custom styled Google Maps iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.0895533899725!2d110.43205977403679!3d-6.998735068544575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708c990db0089b%3A0x6b67584fe408fd4a!2sSMK%20Negeri%209%20Semarang!5e0!3m2!1sid!2sid!4v1773770893828!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0}}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Skanilan Tech Location"
            />
            {/* Overlay to give it a blue-ish tint */}
            <div className="absolute inset-0 bg-violet-900/10 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
