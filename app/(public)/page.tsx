"use client";

import { useEffect, useState } from "react";
import {
    getPublicAbout,
    getPublicProjects,
    getPublicCareers,
    getPublicEducations,
    getPublicResume,
    getPublicTags,
} from "@/services/public-api";
import type { About } from "@/types/about";
import type { Project } from "@/types/project";
import type { Career } from "@/types/career";
import type { Education } from "@/types/education";
import type { Resume } from "@/types/resume";
import type { Tag } from "@/types/tag";

import Navbar from "@/components/portfolio/navbar";
import HeroSection from "@/components/portfolio/hero-section";
import AboutSection from "@/components/portfolio/about-section";
import ExperienceSection from "@/components/portfolio/experience-section";
import ProjectsSection from "@/components/portfolio/projects-section";
import ContactSection from "@/components/portfolio/contact-section";
import Footer from "@/components/portfolio/footer";

export default function Home() {
    const [about, setAbout] = useState<About | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [careers, setCareers] = useState<Career[]>([]);
    const [educations, setEducations] = useState<Education[]>([]);
    const [resume, setResume] = useState<Resume | null>(null);
    const [tags, setTags] = useState<Tag[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function fetchAll() {
            const [
                aboutData,
                projectsData,
                careersData,
                educationsData,
                resumeData,
                tagsData,
            ] = await Promise.all([
                getPublicAbout(),
                getPublicProjects(),
                getPublicCareers(),
                getPublicEducations(),
                getPublicResume(),
                getPublicTags(),
            ]);

            setAbout(aboutData);
            setProjects(projectsData);
            setCareers(careersData);
            setEducations(educationsData);
            setResume(resumeData);
            setTags(tagsData);
            setLoaded(true);
        }

        fetchAll();
    }, []);

    useEffect(() => {
        if (loaded) {
            if (typeof window !== "undefined") {
                const scrollTarget = sessionStorage.getItem("scrollTarget");
                if (scrollTarget) {
                    setTimeout(() => {
                        const el = document.getElementById(scrollTarget);
                        if (el) {
                            el.scrollIntoView({ behavior: "smooth" });
                        }
                        sessionStorage.removeItem("scrollTarget");
                    }, 150);
                    return;
                }
            }

            const hash = window.location.hash;
            if (hash) {
                setTimeout(() => {
                    const el = document.querySelector(hash);
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                    }
                }, 150);
            }
        }
    }, [loaded]);

    if (!loaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center font-mono font-bold text-primary text-sm animate-pulse">
                        Ulumfr
                    </div>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar resume={resume} />
            <HeroSection about={about} />
            <AboutSection about={about} tags={tags} />
            <ExperienceSection careers={careers} educations={educations} />
            <ProjectsSection projects={projects} />
            <ContactSection />
            <Footer />
        </div>
    );
}
