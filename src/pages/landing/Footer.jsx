import React from 'react';

/** Footer — site footer with quick links, legal links, and contact info. */
export default function Footer() {
  return (
    <footer id="contact" className="bg-navy2 border-t border-border pt-12 px-[5%] pb-7">
      <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 mb-10">
        <div>
          <div className="text-2xl font-black tracking-tighter text-white mb-2.5">
            DEC<span className="text-blue2">EPTRA</span>
          </div>
          <p className="text-muted text-[0.78rem] leading-[1.75] max-w-[220px]">
            Real-Time Multimodal Lie Detection System. Final Year Project — CS &amp; IT Dept.
          </p>
          <div className="flex gap-2.5 mt-4">
            {['f', 't', 'in', 'gh'].map((s) => (
              <div
                key={s}
                className="w-[34px] h-[34px] rounded-full bg-blue2/[0.12] border border-border flex items-center justify-center cursor-pointer text-[0.75rem] font-bold text-muted hover:bg-blue2/25 hover:border-blue2 hover:text-blue2 transition-colors"
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-muted mb-3.5 font-mono">Quick Links</h4>
          <ul className="flex flex-col gap-2 list-none">
            {['Home', 'How It Works', 'About Us', 'Dashboard', 'Contact'].map((l) => (
              <li key={l}>
                <a href="#" className="text-muted hover:text-blue2 text-[0.78rem] no-underline transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-muted mb-3.5 font-mono">Legal</h4>
          <ul className="flex flex-col gap-2 list-none">
            {['Terms of Service', 'Privacy Policy', 'Academic Use', 'Open Source'].map((l) => (
              <li key={l}>
                <a href="#" className="text-muted hover:text-blue2 text-[0.78rem] no-underline transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-muted mb-3.5 font-mono">Contact Us</h4>
          <div className="flex items-center gap-2 mb-2.5 text-[0.78rem] text-muted">
            <span>✉</span> support@deceptra.ai
          </div>
          <div className="flex items-center gap-2 mb-2.5 text-[0.78rem] text-muted">
            <span>📞</span> +92 300 555-0123
          </div>
          <div className="flex items-center gap-2 mb-2.5 text-[0.78rem] text-muted">
            <span>🏫</span> CS &amp; IT Dept, University
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6 flex items-center justify-between flex-wrap gap-4">
        <p className="text-muted text-[0.68rem] font-mono">© 2025 DECEPTRA — Final Year Project. All rights reserved.</p>
        <div className="flex gap-5">
          {['Privacy', 'API Docs', 'GitHub'].map((l) => (
            <a key={l} href="#" className="text-muted hover:text-blue2 text-[0.68rem] font-mono no-underline transition-colors">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
