<template>
    <div :class="blockClasses" @click="editItem()">
        <div :class="[bemm('column'), bemm('column', 'details')]">
            <span :class="bemm('item', 'title')">{{ item.title }}</span>
            <span :class="bemm('item', 'description')" v-html="renderedDescription"></span>
            <span :class="bemm('item', 'days')">{{
                formattedDays.join(', ')
                }}</span>
            <span :class="bemm('item', 'tax-rate')" v-if="item.taxRate > -1">{{ item.taxRate }}</span>
        </div>

        <div :class="[bemm('column'), bemm('column', 'quantity')]">
            <span :class="bemm('item', 'quantity')">{{ item.quantity }} {{ item.unit ? item.unit : 'x' }}</span>
        </div>
        <div :class="[bemm('column'), bemm('column', 'price')]">
            <span :class="bemm('item', 'cost')">{{ formatCurrency(item.price) }}</span>
        </div>
        <div :class="[bemm('column'), bemm('column', 'total')]">
            <span
                :class="[bemm('item', 'price'), itemDiscount(item, props.invoice.details).discount > 0 ? bemm('item', 'line-through') : null]">{{
                    formatCurrency(itemPrice(item)) }}</span>
            <span v-if="itemDiscount(item, props.invoice.details).discount" :class="bemm('item', 'discounted')">{{
                formatCurrency(itemDiscount(item, props.invoice.details).price) }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { useBemm } from 'bemm';
import { useRoute } from 'vue-router';
import { Marked } from '@ts-stack/markdown';

import { InvoiceItem, Invoice } from "@/types"

const bemm = useBemm('item-view');

import { itemDiscount, formatCurrency, itemPrice, showPopup } from '@/utils';
import { RouteName } from '@/router';

const route = useRoute();


const props = defineProps({
    item: {
        type: Object as PropType<InvoiceItem>,
        required: true
    },
    invoice: {
        type: Object as PropType<Invoice>,
        required: true
    }
})

const editItem = () => {

    if (route.name === RouteName.EDIT) {

        showPopup({ id: props.item.id })

    }
}

const renderedDescription = computed(() => {
    return Marked.parse(props.item.description);
})

const blockClasses = computed(() => {
    return [bemm(), bemm('', route.name as string || '')]
})



const formattedDays = computed(() => {

    const dates = (props.item.days || [] as Date[]).map((day) => new Date(day));

    const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());

    const groupedByMonth: { [key: string]: Date[] } = sortedDates.reduce((acc, date) => {
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const key = `${month} ${year}`;

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(date);
        return acc;
    }, {} as { [key: string]: Date[] });

    const formatRange = (dates: Date[]) => {
        let ranges = [];
        let start = dates[0];
        let end = dates[0];

        for (let i = 1; i < dates.length; i++) {
            const current = dates[i];
            const previous = dates[i - 1];
            const diff = (current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24);

            if (diff === 1) {
                end = current;
            } else {
                ranges.push({ start, end });
                start = current;
                end = current;
            }
        }

        ranges.push({ start, end });

        return ranges
            .map((range) => {
                const startDay = range.start.getDate();
                const endDay = range.end.getDate();
                // if a range is onoly 2 days, show both days with a comman
                if (startDay + 1 === endDay) {
                    return `${startDay}, ${endDay}`;
                }
                // else show the range with a dash
                return startDay === endDay ? `${startDay}` : `${startDay}-${endDay}`;
            })
            .join(', ');
    };

    return Object.entries(groupedByMonth).map(([month, dates]) => {
        const formattedRanges = formatRange(dates);
        return `${formattedRanges} ${month}`;
    });
});

</script>

<style lang="scss">
.item-view {
    .preview & {
        &--edit {
            &:hover {
                outline: 1px dotted var(--primary);
                outline-offset: 1em;
            }
        }
    }

    &__column {
        &--details {
            display: flex;
            flex-direction: column;
            gap: 0.5em;
        }
    }
}
</style>
