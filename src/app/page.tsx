import LandingPage from "./landing-page";

export default function Home() {
  // In a real application, you'd have logic here to determine
  // if the user is logged in and redirect them to '/dashboard/home' if they are.
  // For now, we'll just show the public landing page.
  return <LandingPage />;
}
