import Header from "@/components/Header";
import LoginModal from "@/components/modals/LoginModal";

export default function Home() {
  return (
    <>
        <LoginModal  />
      <Header  showBackArrow label={'Home'}/>
    </>
  )
}
