import SideBar from "./side-bar";

export function SideBarExample() {
  return (
    <SideBar>
      <SideBar.Trigger className="px-10 px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 flex items-center justify-center text-sm">Open</SideBar.Trigger>
      <SideBar.Container className="p-5 bg-red-900 border">
        <SideBar.Header className="border p-5 bg-yellow-500 flex items-center justify-between">
          <h2>Header</h2>
          <SideBar.Close className="px-3 py-1 rounded bg-gray-800 text-white text-sm">Close</SideBar.Close>
        </SideBar.Header>
        <SideBar.Body className="h-full border p-3">Body</SideBar.Body>
        <SideBar.Footer className="border p-5">Footer</SideBar.Footer>
      </SideBar.Container>
    </SideBar>
  )
}
