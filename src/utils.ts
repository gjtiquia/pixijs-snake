import { Point } from "pixi.js";
import { GlobalContext } from "./GlobalContext";

export function getRandomWorldPosition(ctx: GlobalContext) {
    const WORLD_SIZE = ctx.WORLD_SIZE;
    const randomX = getRandomInt(0, WORLD_SIZE.x);
    const randomY = getRandomInt(0, WORLD_SIZE.y);

    const UNIT_LENGTH = ctx.UNIT_LENGTH;

    const LEFT_BOUND_X = ctx.LEFT_BOUND_X;
    const xPos = LEFT_BOUND_X + randomX * UNIT_LENGTH + UNIT_LENGTH / 2;

    const UPPER_BOUND_Y = ctx.UPPER_BOUND_Y;
    const yPos = UPPER_BOUND_Y + randomY * UNIT_LENGTH + UNIT_LENGTH / 2;

    return new Point(xPos, yPos);
}

export function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}