import { FcHighPriority, FcHome } from "react-icons/fc";

export default function NotFound() {
  return (
    <div className="absolute top-[50%] left-[50%] translate-[-50%]">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-[20vh]">
          <FcHighPriority />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-6xl">
            เอ๋ ~ เหมือนจะมีอะไรผิดพลาดนะ !
          </div>
          <div className="text-black/60 text-4xl">
            เกิดข้อผิดพลาด : ....
          </div>
        </div>
      </div>
    </div>
  )
}