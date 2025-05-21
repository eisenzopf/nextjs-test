import { Chat, ChatSidebar } from "@/components/chat";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-black">
      <ChatSidebar />
      <div className="flex-1">
        <div className="h-screen">
          <Chat />
        </div>
      </div>
    </main>
  );
}
