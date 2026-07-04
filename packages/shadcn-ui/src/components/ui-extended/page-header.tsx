import * as React from 'react'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { cn } from '~/lib/utils'

interface PageHeaderBreadcrumb {
	label: string
	href?: string
}

interface PageHeaderProps {
	title: React.ReactNode
	description?: React.ReactNode
	breadcrumbs?: PageHeaderBreadcrumb[]
	actions?: React.ReactNode
	className?: string
}

function PageHeader({ title, description, breadcrumbs, actions, className }: PageHeaderProps) {
	return (
		<div data-slot="page-header" className={cn('flex flex-col gap-2', className)}>
			{breadcrumbs && breadcrumbs.length > 0 && (
				<Breadcrumb>
					<BreadcrumbList>
						{breadcrumbs.map((crumb, index) => {
							const isLast = index === breadcrumbs.length - 1
							return (
								<React.Fragment key={crumb.label}>
									<BreadcrumbItem>
										{isLast || !crumb.href ? (
											<BreadcrumbPage>{crumb.label}</BreadcrumbPage>
										) : (
											<BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
										)}
									</BreadcrumbItem>
									{!isLast && <BreadcrumbSeparator />}
								</React.Fragment>
							)
						})}
					</BreadcrumbList>
				</Breadcrumb>
			)}
			<div className="flex items-start justify-between gap-4">
				<div className="flex flex-col gap-1">
					<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
					{description && <p className="text-sm text-muted-foreground">{description}</p>}
				</div>
				{actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
			</div>
		</div>
	)
}

export { PageHeader }
export type { PageHeaderProps, PageHeaderBreadcrumb }
