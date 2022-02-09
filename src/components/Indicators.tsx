import React, { ReactNode, useCallback, useMemo } from "react";
import { StyledFiberManualRecordIcon, StyledIndicatorIconButton, StyledIndicators } from "./Styled";
import { SanitizedCarouselNavProps } from "./util";

export interface IndicatorProps
{
    IndicatorIcon?: ReactNode,
    length: number,
    active: number,
    press: Function,
    indicatorContainerProps: SanitizedCarouselNavProps,
    indicatorIconButtonProps: SanitizedCarouselNavProps,
    activeIndicatorIconButtonProps: SanitizedCarouselNavProps,
}

export const Indicators = (props: IndicatorProps) =>
{
    const IndicatorIcon = useMemo(() => props.IndicatorIcon !== undefined ? props.IndicatorIcon : <StyledFiberManualRecordIcon />, [props.IndicatorIcon]);

    const completeListIfRequired = useCallback((arrayOfIcons: Array<ReactNode>) =>
    {
        while (arrayOfIcons.length < props.length)
        {
            let index = 0;
            arrayOfIcons.push(arrayOfIcons[index]);
            index += 1;
        }
    }, [props.length])

    const { className: indicatorIconButtonClass, style: indicatorIconButtonStyle, ...indicatorIconButtonProps } = props.indicatorIconButtonProps;
    const { className: activeIndicatorIconButtonClass, style: activeIndicatorIconButtonStyle, ...activeIndicatorIconButtonProps } = props.activeIndicatorIconButtonProps;

    let indicators = [];

    for (let i = 0; i < props.length; i++)
    {
        const className = i === props.active ?
            `${indicatorIconButtonClass} ${activeIndicatorIconButtonClass}` :
            `${indicatorIconButtonClass}`;

        const style = i === props.active ?
            Object.assign({}, indicatorIconButtonStyle, activeIndicatorIconButtonStyle) :
            indicatorIconButtonStyle;

        let restProps = i === props.active ?
            Object.assign({}, indicatorIconButtonProps, activeIndicatorIconButtonProps) :
            indicatorIconButtonProps;

        if (restProps['aria-label'] === undefined) restProps['aria-label'] = 'carousel indicator';

        const createIndicator = (IndicatorIcon: ReactNode) =>
        {
            return (
                <StyledIndicatorIconButton
                    $active={i === props.active}
                    key={i}
                    className={className}
                    style={style}
                    onClick={() => { props.press(i) }}
                    {...restProps}
                    aria-label={`${restProps['aria-label']} ${i + 1}`}
                >
                    {IndicatorIcon}
                </StyledIndicatorIconButton>
            )
        }

        Array.isArray(IndicatorIcon)
            ? indicators.push(createIndicator(IndicatorIcon[i])) && completeListIfRequired(IndicatorIcon)
            : indicators.push(createIndicator(IndicatorIcon))

    }

    const { className: indicatorContainerClass, style: indicatorContainerStyle, ...indicatorContainerProps } = props.indicatorContainerProps;

    return (
        <StyledIndicators className={indicatorContainerClass} style={indicatorContainerStyle} {...indicatorContainerProps}>
            {indicators}
        </StyledIndicators>
    )
}