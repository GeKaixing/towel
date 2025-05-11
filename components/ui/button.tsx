import * as React from "react" // 导入 React 库
import { Slot } from "@radix-ui/react-slot" // 从 Radix UI 库中导入 Slot 组件
import { cva, type VariantProps } from "class-variance-authority" // 导入 cva 函数和 VariantProps 类型，用于处理样式变体

import { cn } from "@/lib/utils" // 导入 cn 函数，用于合并类名

// 定义按钮的样式变体
const buttonVariants = cva(
  // 基础样式
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    // 定义样式变体
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90", // 默认样式
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40", // 销毁按钮样式
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground", // 描边按钮样式
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80", // 次要按钮样式
        ghost: "hover:bg-accent hover:text-accent-foreground", // 幽灵按钮样式
        link: "text-primary underline-offset-4 hover:underline", // 链接按钮样式
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3", // 默认尺寸
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5", // 小尺寸
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4", // 大尺寸
        icon: "size-9", // 图标按钮尺寸
      },
    },
    // 默认的样式变体
    defaultVariants: {
      variant: "default", // 默认按钮样式
      size: "default", // 默认按钮尺寸
    },
  }
)

// 定义 Button 组件
function Button({
  className, // 自定义类名
  variant, // 样式变体
  size, // 尺寸变体
  asChild = false, // 是否作为子组件渲染
  ...props // 其他属性
}: React.ComponentProps<"button"> & // 按钮的原生属性
  VariantProps<typeof buttonVariants> & { // 样式变体的类型
    asChild?: boolean // 可选的 asChild 属性
  }) {
  const Comp = asChild ? Slot : "button" // 根据 asChild 决定渲染 Slot 或 button 元素

  return (
    <Comp
      data-slot="button" // 添加 data-slot 属性，便于调试或样式选择
      className={cn(buttonVariants({ variant, size, className }))} // 合并样式类名
      {...props} // 传递剩余的属性
    />
  )
}

// 导出 Button 组件和 buttonVariants 样式
export { Button, buttonVariants }
