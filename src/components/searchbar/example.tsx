import { useState } from "react";
import { Search, X, XIcon } from "lucide-react";
import SearchBar from "./search-bar";


export function SearchBarExample() {
    const [input, setInput] = useState("");
    return (
        <SearchBar>
            <SearchBar.Trigger className="px-4 py-2 bg-blue-600 text-white rounded-xl">Search</SearchBar.Trigger>
            <SearchBar.Container className="bg-blue-500 p-3">
                <SearchBar.Head className="bg-yellow-600/70 flex items-center justify-between gap-1">
                    <SearchBar.InputContainer className="p-2 bg-violet-500/40 w-full">
                        <Search />
                        <SearchBar.Input placeholder="SearchBar component..." onChange={(e) => setInput(e.currentTarget.value)} value={input} />
                        <SearchBar.ClearInput onClick={() => setInput("")}>
                            <X />
                        </SearchBar.ClearInput>
                    </SearchBar.InputContainer>
                    <SearchBar.CloseSearch className="bg-red-500 p-2">
                        <XIcon />
                    </SearchBar.CloseSearch>
                </SearchBar.Head>
                <SearchBar.Body className="bg-yellow-600">
                    <SearchBar.ResultsContainer className="border p-3 bg-blue-600/10">
                        Results Container : {input}
                    </SearchBar.ResultsContainer>
                </SearchBar.Body>
            </SearchBar.Container>
        </SearchBar>
    )
}
