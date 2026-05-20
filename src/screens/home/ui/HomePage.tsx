import { CourseLandingPage } from "@/screens/course-landing";
import { DesktopComingSoon } from "./DesktopComingSoon";

export function HomePage() {
  return (
    <>
      <div className="min-[481px]:hidden">
        <CourseLandingPage />
      </div>
      <DesktopComingSoon />
    </>
  );
}
