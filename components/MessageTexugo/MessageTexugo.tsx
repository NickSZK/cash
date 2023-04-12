import { Texugo } from "../../assets/Icons/Texugo";
import { MessageTexugoType } from "../../types/MessageTexugoType";

export const MessageTexugo = ({ msg, tw, th, className, textColor, invertedX }: MessageTexugoType) => {
   return (
      <span className="flex column">
         <h2 className={className}>
            {msg}
         </h2>

         <Texugo w={tw} h={th} className={ invertedX } />
      </span>
   )
}