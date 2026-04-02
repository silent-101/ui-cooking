import { ChevronRight, Star } from "lucide-react";
import Card from "./card";

export function CardExample() {
  return (
    <Card>
      <Card.Container className="border max-w-lg p-2">
        <Card.Body className="flex gap-2">
          <div className="w-28 aspect-2/3">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.3h0oXUpJLPaV-hG4_duNGwHaEK%3Fpid%3DApi&f=1&ipt=fcf7fff48d5d3e548f49ee31bb6463719e26546760476e218a945123759a4fcd&ipo=images"
              alt="Solo Leveling poster"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 p-2">
            <Card.Title className="text-xl font-bold">Solo Leveling</Card.Title>
            <Card.Description className="line-clamp-2 max-w-xs text-slate-300/80 text-sm">The art of being unknown is something one should be proud of.</Card.Description>
            <Card.ExtraInfo className="flex items-center gap-3">
              <p className="flex text-xs items-center gap-1 justify-center">
                <Star className="w-3 h-3 text-orange-400" aria-hidden="true" />
                <span>
                  9.7
                </span>
              </p>
              <p className="text-xs font-bold text-slate-300/60">Ep 12</p>
            </Card.ExtraInfo>
            <Card.Footer className="flex items-center py-2">
              <button type="button" className="flex bg-olive-500/40 items-center justify-center gap-2 px-3 py-1 text-sm">
                <span>Watch now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </Card.Footer>
          </div>
        </Card.Body>
      </Card.Container>
    </Card>
  )
}
