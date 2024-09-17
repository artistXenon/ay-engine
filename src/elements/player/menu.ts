import { Sprite } from "artistic-engine/sprite";
import BaseButton from "../base-button";
import { ResolutionVector } from "../../helper";
import { IPointerListener } from "artistic-engine/event";
import { RunningEngine } from "../../state";
import { MainScene, SettingsScene } from "../../scenes";

export default class PlayerMenu extends Sprite implements IPointerListener {
    public PointerRegistered: boolean = true;

    private menuItems: PlayerMenuItem[] = [];

    constructor() {
        super();
        this.Position = new ResolutionVector(1920 * 0.1, 1080 * 0.93);
        this.Dimension = new ResolutionVector(1920 * 0.8, 1080 * 0.07);

        this.menuItems = [
            new PlayerMenuItem(10, 10, 50, 50, "skip-toggle"),
            new PlayerMenuItem(80, 10, 50, 50, "autoplay-toggle"),
            new PlayerMenuItem(150, 10, 50, 50, "ui-toggle"),
            new PlayerMenuItem(220, 10, 50, 50, "show-log"),
            new PlayerMenuItem(290, 10, 50, 50, "save-menu"),
            new PlayerMenuItem(360, 10, 50, 50, "load-menu"),
            new PlayerMenuItem(430, 10, 50, 50, "settings-menu", () => {
                RunningEngine().Scene = SettingsScene();
            }),
            new PlayerMenuItem(500, 10, 50, 50, "main-scene", () => {
                RunningEngine().Scene = MainScene();
            }),
        ];

        this.attachChildren(this.menuItems);
    }

    onPointer(
        type: string,
        localX: number,
        localY: number,
        inBound: boolean,
        e: PointerEvent,
    ): boolean {
        if (!inBound) return false;
        let menuItem: PlayerMenuItem,
            itemX: number,
            itemY: number,
            itemBound: boolean;
        let isBound = false;
        for (menuItem of this.menuItems) {
            itemX = localX - menuItem.X;
            itemY = localY - menuItem.Y;
            itemBound =
                itemX > 0 &&
                itemY > 0 &&
                itemX < menuItem.W &&
                itemY < menuItem.H;
            isBound ||= itemBound;
            menuItem.onPointer(type, itemX, itemY, itemBound, e);
        }
        return isBound;
    }

    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "skyblue";
        context.fillRect(0, 0, this.W, this.H);
    }
}

// 스킵 토글
// 자동 재생
// UI 숨기기
// 로그 보기

// 저장하기
// 불러오기
// 설정 열기
// 메인으로
class PlayerMenuItem extends BaseButton {
    private name;

    private onClick: () => void;

    constructor(
        X: number,
        Y: number,
        W: number,
        H: number,
        name?: string,
        onClick: () => void = () => undefined,
    ) {
        super(X, Y, W, H);
        this.name = name;
        this.onClick = onClick;
    }
    public onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "white";
        context.fillRect(0, 0, this.W, this.H);
    }

    public onDown(e: PointerEvent): void {
        console.log("clicked " + this.name);
    }

    public onUp(e: PointerEvent): void {
        this.onClick();
    }

    public onHover(e: PointerEvent): void {}

    public onDrop(e: PointerEvent): void {}
}
