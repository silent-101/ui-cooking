import { CardExample } from "./components/card/example";
import { SearchBarExample } from "./components/searchbar/example";
import { SideBarExample } from "./components/sidebar/example";

export function App() {
  return (
    <div className="w-full min-h-screen bg-stone-900 text-white p-5">
      <SideBarExample />
      <SearchBarExample />
      <CardExample />
    </div>
  )
}
