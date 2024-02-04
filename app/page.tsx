import UserPanel from "@/client/container/UserPanel";
import '../client/international/init/initi18'
import { StyledEngineProvider } from "@mui/material";
export default function Home() {
  return (
    <main className="">
      <StyledEngineProvider injectFirst>
        <UserPanel />
      </StyledEngineProvider>
    </main>
  );
}
