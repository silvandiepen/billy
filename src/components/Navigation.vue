<template>
    <nav :class="bemm()">
        <div :class="bemm('container')">
            <ButtonGroup type="stack">
                <Button v-for="(button, btnIndex) in navigationItems" :key="btnIndex" :color="button.color"
                    :icon="button.icon" @click="button.action" :tooltip="button.tooltip"></Button>
            </ButtonGroup>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useBemm } from 'bemm';
import { useRouter, useRoute } from 'vue-router';

import { Colors, Icons } from '@/types';
import { useInvoice, useArchive } from '@/composables';
import { encodeInvoice, invoiceNumber } from '@/utils';

import Button from '@/components/Button/Button.vue';
import ButtonGroup from '@/components/ButtonGroup.vue';
import { RouteName } from '@/router';
import { ButtonSettings } from './Button/Button.model';

const { bemm } = useBemm('navigation');
const { push } = useRouter();
const { invoice, setId, isBlank, newInvoice } = useInvoice();
const { addInvoice, invoiceExists, invoiceHasUpdate } = useArchive();

const goToArchive = () => push({ name: 'archive' });
const goToEdit = () => push({ name: 'edit' });

const createNewInvoice = () => {
    newInvoice();
    push('/edit');
};

const saveToArchive = () => {
    const newInvoice = addInvoice(invoice.value);
    setId(newInvoice.id);
};

const isArchived = computed(() => {
    return invoiceExists(invoice.value);
});

const hasUpdate = computed(() => {
    return invoiceHasUpdate(invoice.value);
});

const viewInsert = () => {
    push({
        name: RouteName.INSERT,
    });
};

const viewInvoice = () => {
    const data = encodeInvoice(invoice.value, 'secret-key');
    push({
        name: 'view',
        params: {
            data: data,
        },
    });
};

const downloadJson = () => {
    const data = JSON.stringify(invoice.value);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoiceNumber(invoice.value)}.json`;
    a.click();
    URL.revokeObjectURL(url);
};
const route = useRoute();

const navigationItems = computed<{
    color: Colors;
    icon: Icons;
    action: () => void;
    condition: boolean;
    tooltip?: string;
}[]>(() => {

    if (route.name === RouteName.ARCHIVE) {
        return [{
            color: ButtonSettings.Color.PRIMARY,
            icon: Icons.FILE_ADD,
            action: createNewInvoice,
            condition: true,
        }].filter((item) => item.condition);

    }

    if (route.name === RouteName.VIEW) {
        return [{
            color: ButtonSettings.Color.PRIMARY,
            icon: Icons.ARROW_LEFT,
            action: goToArchive,
            condition: true,
        },{
            color: ButtonSettings.Color.PRIMARY,
            icon: Icons.FILE_EDIT,
            action: goToEdit,
            condition: true,
        }].filter((item) => item.condition);
    }

    if (route.name === RouteName.EDIT) {
        return [{
            color: ButtonSettings.Color.PRIMARY,
            icon: Icons.ARROW_LEFT,
            tooltip: 'Go to archive',
            action: goToArchive,
            condition: true,
        },
        {
            color: ButtonSettings.Color.PRIMARY,
            icon: Icons.VISIBLE,
            tooltip: 'View invoice',
            action: viewInvoice,
            condition: !isBlank.value,
        },
        {
            color: ButtonSettings.Color.PRIMARY,
            icon: Icons.ARROW_RIGHT,
            tooltip: 'Save to archive',
            action: saveToArchive,
            condition: !isBlank.value && !isArchived.value,
        },
        {
            color: ButtonSettings.Color.PRIMARY,
            icon: Icons.ARROW_RIGHT,
            tooltip: 'Save to archive',
            action: saveToArchive,
            condition: !isBlank.value && isArchived.value && hasUpdate.value,
        },
        {
            color: ButtonSettings.Color.PRIMARY,
            icon: Icons.ARROW_DOWN,
            tooltip: 'Import/Export data',
            action: viewInsert,
            condition: !isBlank.value,
        }].filter((item) => item.condition);
    }

    if (route.name === RouteName.INSERT) {
        return [{
            color: ButtonSettings.Color.PRIMARY,
            icon: Icons.ARROW_LEFT,
            tooltip: 'Go to edit',
            action: goToEdit,
            condition: true,
        },
        {
            color: ButtonSettings.Color.PRIMARY,
            icon: Icons.VISIBLE,
            tooltip: 'View invoice',
            action: viewInvoice,
            condition: !isBlank.value,
        },
        {
            color: ButtonSettings.Color.PRIMARY,
            icon: Icons.ARROW_RIGHT,
            tooltip: 'Save to archive',
            action: saveToArchive,
            condition: !isBlank.value && !isArchived.value,
        },
        {
            color: ButtonSettings.Color.PRIMARY,
            icon: Icons.ARROW_RIGHT,
            tooltip: 'Save to archive',
            action: saveToArchive,
            condition: !isBlank.value && isArchived.value && hasUpdate.value,
        },
        {
            color: ButtonSettings.Color.PRIMARY,
            icon: Icons.ARROW_DOWN,
            tooltip: 'Import/Export data',
            action: downloadJson,
            condition: !isBlank.value,
        }].filter((item) => item.condition);
    }
    return []
});
</script>

<style lang="scss">
.navigation {
    position: fixed;
    bottom: 0;
    left: 50%;
    padding: var(--space);
    background-color: var(--dark);
    border-radius: 4em;
    margin: var(--space);
    transform: translateX(-50%);
    z-index: 100;

    &__container {
        gap: var(--space);
        display: flex;
    }
}
</style>
