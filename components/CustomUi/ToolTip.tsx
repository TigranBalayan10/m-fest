import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import AlertDelete from "@/components/CustomUi/AlertDelete"
import React from "react";

interface ToolTipProps {
    children?: React.ReactNode;
    tooltipText: string;
    itemId?: string;
    actionEndpoint: string;
    httpMethod: string;
    title: string;
    getEndpoint?: string;
}

const ToolTip: React.FC<ToolTipProps> = ({ children, tooltipText, itemId, actionEndpoint, httpMethod, title, getEndpoint }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <AlertDelete
                            itemId={itemId || ""}
                            title={title}
                            actionEndpoint={actionEndpoint}
                            httpMethod={httpMethod}
                            actionName="Delete"
                       />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <Tooltip>{tooltipText}</Tooltip>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider >
    )
}


export default ToolTip