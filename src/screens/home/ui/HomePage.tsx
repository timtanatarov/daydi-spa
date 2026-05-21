import { CourseLandingPage } from "@/screens/course-landing";
import { DesktopComingSoon } from "./DesktopComingSoon";

export function HomePage() {
  return (
    <>
      <div className="min-[481px]:hidden min-w-0 overflow-x-clip">
        <CourseLandingPage />
      </div>
      <DesktopComingSoon />
    </>
  );
}
