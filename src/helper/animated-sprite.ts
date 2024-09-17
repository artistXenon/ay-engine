// WARN: ay properties not applied. use with caution
// import { TextureSprite } from "artistic-engine/sprite";

// export class AnimationSprite extends TextureSprite {
//     protected textures: ImageBitmap[] = [];

//     protected frame: number = 0;

//     protected period: number = Infinity;

//     private lastUpdate = performance.now();

//     public get Textures(): ImageBitmap[] {
//         return this.textures;
//     }

//     public get Frame(): number {
//         return this.frame;
//     }

//     public get Period(): number {
//         return this.period;
//     }

//     public set Textures(textures: ImageBitmap[]) {
//         this.textures = textures;
//         this.Frame = this.frame;
//     }

//     public set Frame(frame: number) {
//         this.frame = frame % this.textures.length;
//     }

//     public set Period(period: number) {
//         this.period = period;
//     }

//     override onDraw(context: CanvasRenderingContext2D, delay: number): void {
//         if (this.period > 0 && this.textures.length > 0) {
//             const now = performance.now();
//             const elapsed = now - this.lastUpdate;
//             const diff_frame = Math.floor(elapsed / this.period);
//             const diff_time = elapsed % this.period;
//             if (diff_frame >= 0) {
//                 this.lastUpdate = now - diff_time;
//                 this.Frame = this.frame + diff_frame;
//             }
//         }
//         this.texture = this.textures[this.frame];
//         super.onDraw(context, delay);
//     }
// }
