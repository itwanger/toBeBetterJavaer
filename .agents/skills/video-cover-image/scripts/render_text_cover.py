#!/usr/bin/env python3
import argparse
import math
import random
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


WHITE = (253, 253, 249, 255)
YELLOW = (255, 238, 48, 255)
DARK = (22, 26, 26, 255)
SHADOW = (0, 0, 0, 155)
PROTECTED_TERMS = (
    "Claude Code",
    "短期记忆",
    "长期记忆",
    "上下文窗口",
    "死循环",
    "命中率",
    "工具调用",
    "自动压缩",
    "摘要压缩",
    "加密压缩",
)


def resolve_font():
    candidates = [
        "Hiragino Sans GB:style=W6",
        "PingFang SC:style=Semibold",
        "Arial Unicode MS",
    ]
    for candidate in candidates:
        try:
            path = subprocess.check_output(
                ["fc-match", "-f", "%{file}\n", candidate], text=True
            ).strip()
            index = int(
                subprocess.check_output(
                    ["fc-match", "-f", "%{index}\n", candidate], text=True
                ).strip()
                or 0
            )
        except Exception:
            continue
        if path:
            return path, index
    raise SystemExit("No usable CJK font found")


FONT_FILE, FONT_INDEX = resolve_font()


def make_font(size):
    return ImageFont.truetype(FONT_FILE, size, index=FONT_INDEX)


def text_bbox(text, font):
    draw = ImageDraw.Draw(Image.new("RGBA", (10, 10)))
    return draw.textbbox((0, 0), text, font=font)


def fit_font(text, max_width, start_size, min_size):
    for size in range(start_size, min_size - 1, -2):
        font = make_font(size)
        box = text_bbox(text, font)
        if box[2] - box[0] <= max_width:
            return font
    return make_font(min_size)


def wrap_text(text, font, max_width):
    lines = []
    current = ""
    for char in text:
        candidate = current + char
        box = text_bbox(candidate, font)
        if current and box[2] - box[0] > max_width:
            lines.append(current.strip())
            current = char.lstrip()
        else:
            current = candidate
    if current:
        lines.append(current.strip())
    return [line for line in lines if line]


def balance_lines(text, font, max_width, line_count):
    target_width = (text_bbox(text, font)[2] - text_bbox(text, font)[0]) / line_count
    states = {(0, 0): (0, [])}
    text_length = len(text)

    for used_lines in range(line_count):
        for start in range(text_length):
            state = states.get((used_lines, start))
            if state is None:
                continue
            previous_cost, previous_lines = state
            remaining_lines = line_count - used_lines - 1
            for end in range(start + 1, text_length + 1):
                if text_length - end < remaining_lines:
                    break
                line = text[start:end].strip()
                if not line:
                    continue
                box = text_bbox(line, font)
                width = box[2] - box[0]
                if width > max_width:
                    break
                cost = previous_cost + (width - target_width) ** 2
                if len(line) <= 2:
                    cost += target_width**2
                if (
                    end < text_length
                    and text[end - 1].isascii()
                    and text[end - 1].isalnum()
                    and text[end].isascii()
                    and text[end].isalnum()
                ):
                    # Keep English product names and acronyms intact whenever a
                    # legal break exists, especially on narrow vertical covers.
                    cost += target_width**2 * 100
                for term in PROTECTED_TERMS:
                    term_start = text.find(term)
                    while term_start != -1:
                        if term_start < end < term_start + len(term):
                            cost += target_width**2 * 100
                        term_start = text.find(term, term_start + 1)
                key = (used_lines + 1, end)
                if key not in states or cost < states[key][0]:
                    states[key] = (cost, previous_lines + [line])

    result = states.get((line_count, text_length))
    return result[1] if result else wrap_text(text, font, max_width)


def fit_multiline_font(text, max_width, start_size, min_size, max_lines):
    if text.isascii() and " " not in text and "-" in text:
        # Versioned model identifiers are easier to recognize intact than when
        # a balanced wrap splits a decimal version or a hyphenated suffix.
        for size in range(start_size, min_size - 1, -2):
            font = make_font(size)
            box = text_bbox(text, font)
            if box[2] - box[0] <= max_width:
                return font, [text]

    for size in range(start_size, min_size - 1, -2):
        font = make_font(size)
        lines = wrap_text(text, font, max_width)
        if len(lines) <= max_lines:
            return font, balance_lines(text, font, max_width, len(lines))
    font = make_font(min_size)
    lines = wrap_text(text, font, max_width)
    return font, balance_lines(text, font, max_width, len(lines))


def charcoal_background(width, height, seed):
    random.seed(seed)
    base = Image.new("RGBA", (width, height), DARK)

    noise = Image.effect_noise((width, height), 35).convert("L")
    noise = ImageEnhance.Contrast(noise).enhance(0.85)
    noise = noise.filter(ImageFilter.GaussianBlur(0.45))
    alpha = Image.new("L", (width, height), 18)
    base = Image.alpha_composite(base, Image.merge("RGBA", (noise, noise, noise, alpha)))

    scratches = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(scratches)
    for _ in range(46):
        x = random.randint(-width // 10, width)
        y = random.randint(-height // 10, height)
        length = random.randint(width // 8, width // 4)
        angle = random.uniform(-0.42, 0.42)
        shade = random.randint(40, 64)
        alpha_value = random.randint(7, 16)
        draw.line(
            [
                (x, y),
                (
                    x + int(length * math.cos(angle)),
                    y + int(length * math.sin(angle)),
                ),
            ],
            fill=(shade, shade, shade, alpha_value),
            width=1,
        )
    base = Image.alpha_composite(base, scratches.filter(ImageFilter.GaussianBlur(1.2)))

    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    draw.ellipse(
        [
            int(width * 0.08),
            int(height * 0.04),
            int(width * 0.92),
            int(height * 0.86),
        ],
        fill=(58, 62, 58, 58),
    )
    glow = glow.filter(ImageFilter.GaussianBlur(int(min(width, height) * 0.13)))
    return Image.alpha_composite(base, glow)


def draw_centered(image, y, text, font, color, shadow_dx=5, shadow_dy=6):
    draw = ImageDraw.Draw(image)
    x = image.width // 2
    draw.text((x + shadow_dx, y + shadow_dy), text, font=font, fill=SHADOW, anchor="mt")
    draw.text((x, y), text, font=font, fill=color, anchor="mt")


def draw_multiline_centered(image, y, lines, font, color):
    line_height = int(font.size * 1.16)
    for index, line in enumerate(lines):
        draw_centered(image, y + index * line_height, line, font, color)


def render(width, height, title, lines, vertical):
    image = charcoal_background(width, height, 202 if vertical else 101)
    title_font, title_lines = fit_multiline_font(
        title,
        int(width * (0.88 if vertical else 0.86)),
        int(height * (0.094 if vertical else 0.137)),
        int(height * (0.067 if vertical else 0.100)),
        4 if vertical else 3,
    )
    title_y = int(height * (0.27 if vertical else 0.24))
    draw_multiline_centered(image, title_y, title_lines, title_font, WHITE)

    if not lines:
        return image.convert("RGB")

    max_width = int(width * (0.88 if vertical else 0.84))
    start_size = int(height * (0.056 if vertical else 0.081))
    min_size = int(height * (0.039 if vertical else 0.057))
    fonts = [fit_font(line, max_width, start_size, min_size) for line in lines]

    if len(lines) == 1:
        ys = [int(height * (0.55 if vertical else 0.54))]
    else:
        # A wrapped horizontal title extends into the normal yellow-text zone.
        # Move the keyword block down while preserving the reference spacing.
        if not vertical and len(title_lines) > 1:
            top = height * 0.61
        else:
            top = height * 0.52
        gap = height * (0.079 if vertical else 0.104)
        ys = [int(top + index * gap) for index in range(len(lines))]

    for y, line, font in zip(ys, lines, fonts):
        draw_centered(image, y, line, font, YELLOW, 4, 5)

    return image.convert("RGB")


def main():
    parser = argparse.ArgumentParser(description="Render black/gray pure-text video covers.")
    parser.add_argument("--title", required=True)
    parser.add_argument("--line", action="append", default=[])
    parser.add_argument("--prefix", default="video-cover")
    parser.add_argument("--out-dir", default=str(Path.home() / "Downloads"))
    args = parser.parse_args()

    out_dir = Path(args.out_dir).expanduser()
    out_dir.mkdir(parents=True, exist_ok=True)
    horizontal_16x9 = render(1920, 1080, args.title, args.line, vertical=False)
    horizontal_4x3 = render(1440, 1080, args.title, args.line, vertical=False)
    vertical = render(1080, 1440, args.title, args.line, vertical=True)

    horizontal_16x9_path = out_dir / f"{args.prefix}-horizontal-16x9.png"
    horizontal_4x3_path = out_dir / f"{args.prefix}-horizontal-4x3.png"
    vertical_path = out_dir / f"{args.prefix}-vertical-3x4.png"
    horizontal_16x9.save(horizontal_16x9_path, quality=94)
    horizontal_4x3.save(horizontal_4x3_path, quality=94)
    vertical.save(vertical_path, quality=94)
    print(horizontal_16x9_path)
    print(horizontal_4x3_path)
    print(vertical_path)


if __name__ == "__main__":
    main()
