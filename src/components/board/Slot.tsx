import { FC } from "react";
import _ from "lodash";
import useBearStore, { setMovingPiece, setPiecePostion } from "../../store";
import { BoardStore, Player } from "../../types";

const getTurnColor = (state: BoardStore) => {
  let player: Player;

  if (state.game.turn === state.game.player1.name) {
    player = state.game.player1;
  } else {
    player = state.game.player2;
  }

  return player.color;
};

const Slot: FC<{ slot: string }> = ({ slot }) => {
  const board = useBearStore((state) => state.virtualBoard);
  const moving = useBearStore((state) => state.moving);
  const game = useBearStore((state) => state.game);
  const color = useBearStore(getTurnColor);

  const cell = board[slot];
  const piece = cell.piece;

  const handleClickSlot = () => {
    if (_.isEmpty(moving) && _.isEmpty(piece)) {
      return;
    }

    if (!_.isEmpty(piece)) {
			if(color !== piece.color) {
				return
			}

      return setMovingPiece(cell, slot);
    }

    if (moving.avMoves.includes(slot)) {
      return setPiecePostion(moving.position, slot);
    }
  };

  const renderSpot = () => {
    if (!_.isEmpty(piece)) {
      return piece.icon;
    }
    return;
  };

  return (
    <div
      onClick={handleClickSlot}
      data-testid="slot"
      style={{
        display: "inline-block",
        fontSize: "20px",
        border: "2px solid darkred",
        width: "50px",
        height: "50px",
      }}
    >
      {renderSpot()}
    </div>
  );
};

export default Slot;
