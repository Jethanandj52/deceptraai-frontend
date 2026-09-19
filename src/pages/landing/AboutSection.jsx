import React from 'react';
import Avatar from './Avatar';

const SUPERVISOR = {
  name: 'Dr. Muhammad Asad Abbasi',
  role: 'Project Supervisor · Head Of Department',
  bio: 'Dr. Asad Muhammad Abbasi provides academic and research guidance for the DECEPTRA project, ensuring its alignment with academic standards, research methodology, ethical considerations, and institutional requirements. His expertise and supervision support the successful development and implementation of the project.',
  photo: '/supervisor.jpeg',
};

const TEAM = [
   {
    name: 'Kunwal Rai',
    role: 'Group Leader (AI & Data Scientist)',
    bio: 'Focused on data preprocessing and feature extraction pipelines, ensuring clean and reliable input for all modality models.',
    photo: '/kunwal.jpeg',
  },
  {
    name: 'Paman',
    role: ' AI / ML',
    bio: 'Led the team and developed the core AI and ML algorithms for accurate deception detection across all three modalities.',
    photo: '/paman.jpeg',
  },
 
  {
    name: 'Surendar',
    role: 'Frontend Developer',
    bio: 'Designed and implemented the React dashboard UI, webcam integration, and real-time visualization of results.',
    photo: '/surendar.jpeg',
  },
  {
    name: 'Nawal Rai',
    role: 'Backend Developer',
    bio: 'Built and optimized the FastAPI backend, including all four REST endpoints, database design, and API documentation.',
    photo: '/nawal.png',
  },
];

/** AboutSection — supervisor + student team ("About") section of the home page. */
export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-[5%] bg-navy3">

      {/* About Header */}
      <div
        className="rounded-2xl p-10 text-center mb-12"
        style={{
          background:
            'linear-gradient(135deg, rgba(26,111,255,0.1), rgba(0,212,255,0.05))',
          border: '1px solid rgba(26,111,255,0.18)',
        }}
      >
        <span className="block font-mono text-[0.62rem] tracking-[0.15em] uppercase text-blue2 mb-2.5">
          About
        </span>

        <h2 className="font-extrabold tracking-tight mb-2.5 text-white text-[clamp(1.5rem,3vw,2.2rem)]">
          About DECEPTRA
        </h2>

        <p className="text-muted text-[0.88rem] max-w-xl mx-auto leading-[1.8]">
          Meet the team behind Pakistan's first open-source multimodal lie detection system — built
          as a Final Year Project at the CS &amp; IT Department.
        </p>
      </div>

      {/* Supervisor Heading */}
      <div className="text-center mb-5">
        <h3 className="text-[1.1rem] font-extrabold text-white tracking-tight">
          Project Supervisor
        </h3>
      </div>

      {/* Supervisor */}
      <div className="max-w-3xl mx-auto mb-14">
        <div className="bg-card border border-border rounded-2xl p-7 flex flex-col sm:flex-row gap-7 items-start shadow-2xl shadow-black/40">

          {/* Supervisor Image / Avatar */}
          {SUPERVISOR.photo ? (
            <img
              src={SUPERVISOR.photo}
              alt={SUPERVISOR.name}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling.style.display = 'flex';
              }}
              className="w-[110px] h-[125px] flex-shrink-0 border-2 border-blue2/35 shadow-lg rounded-lg object-cover"
            />
          ) : null}

          <div
            className="w-[110px] h-[125px] flex-shrink-0"
            style={{ display: SUPERVISOR.photo ? 'none' : 'flex' }}
          >
            <Avatar
              name={SUPERVISOR.name}
              shape="rect"
              className="w-full h-full border-2 border-blue2/35 shadow-lg text-2xl"
            />
          </div>

          <div>
            <div className="text-[1.05rem] font-extrabold text-blue2 mb-1">
              {SUPERVISOR.name}
            </div>

            <div className="text-[0.75rem] text-muted mb-2.5 font-mono">
              {SUPERVISOR.role}
            </div>

            <p className="text-muted text-[0.82rem] leading-[1.75]">
              {SUPERVISOR.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Student Team Heading */}
      <div className="text-center mb-5">
        <h3 className="text-[1.1rem] font-extrabold text-white tracking-tight">
          Student Team
        </h3>

        <p className="text-muted text-[0.82rem] mt-1.5 max-w-lg mx-auto">
          A dedicated team of Information Technology students behind DECEPTRA, turning an
          innovative idea into reality through AI, research, development, and collaboration.
        </p>
      </div>

      {/* Student Team */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.1rem]">
        {TEAM.map((m) => (
          <div
            key={m.name}
            className="relative overflow-hidden bg-card border border-border rounded-2xl px-5 py-6 text-center transition-transform hover:-translate-y-1"
          >
            {/* Top Gradient Line */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{
                background: 'linear-gradient(90deg,#1a6fff,#00d4ff)',
              }}
            />

            {/* Member Image / Avatar */}
            {m.photo ? (
              <img
                src={m.photo}
                alt={m.name}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
                className="w-[88px] h-[88px] mx-auto mb-4 border-[2.5px] border-blue2/35 shadow-lg rounded-full object-cover"
              />
            ) : null}

            <div
              className="w-[88px] h-[88px] mx-auto mb-4"
              style={{ display: m.photo ? 'none' : 'flex' }}
            >
              <Avatar
                name={m.name}
                className="w-full h-full border-[2.5px] border-blue2/35 shadow-lg text-lg"
              />
            </div>

            {/* Name */}
            <div className="text-[0.92rem] font-bold text-blue2 mb-1">
              {m.name}
            </div>

            {/* Role */}
            <div className="text-[0.68rem] text-muted font-mono mb-2.5 tracking-wide">
              {m.role}
            </div>

            {/* Bio */}
            <p className="text-muted text-[0.75rem] leading-[1.65]">
              {m.bio}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}