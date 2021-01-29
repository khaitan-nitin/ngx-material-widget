export declare const enum BadgeColor {
    PRIMARY = "primary",
    ASCENT = "accent",
    WARN = "warn"
}
export declare const enum BadgePosition {
    ABOVE_AFTER = "above after",
    ABOVE_BEFORE = "above before",
    BELOW_BEFORE = "below before",
    BELOW_AFTER = "below after",
    BEFORE = "before",
    AFTER = "after",
    ABOVE = "above",
    BELOW = "below"
}
export declare const enum BadgeSize {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large"
}
export interface Badge {
    identifier: string;
    content: string;
    color: BadgeColor;
    position: BadgePosition;
    size: BadgeSize;
    hide: boolean;
}
