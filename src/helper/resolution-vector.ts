import { Vector } from "artistic-engine";
import { Config } from "../state";

export default class ResolutionVector extends Vector.Vector2D {
    private static width = 1920;

    private static height = 1080;

    public override get X() {
        return ResolutionVector.toRelativeX(super.X);
    }

    public override get Y() {
        return ResolutionVector.toRelativeY(super.Y);
    }

    public get baseX() {
        return super.X;
    }

    public get baseY() {
        return super.Y;
    }

    public override set X(x: number) {
        super.X = ResolutionVector.tobaseX(x);
    }

    public override set Y(y: number) {
        super.Y = ResolutionVector.tobaseY(y);
    }

    public set baseX(x: number) {
        super.X = x;
    }

    public set baseY(y: number) {
        super.Y = y;
    }

    public static tobaseX(x: number) {
        return (x * ResolutionVector.width) / Config().Resolution.X;
    }

    public static tobaseY(y: number) {
        return (y * ResolutionVector.height) / Config().Resolution.Y;
    }

    public static toRelativeX(x: number) {
        return (Config().Resolution.X * x) / ResolutionVector.width;
    }

    public static toRelativeY(y: number) {
        return (Config().Resolution.Y * y) / ResolutionVector.height;
    }
}
