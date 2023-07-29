<script setup lang="ts">
import IconComponent from '@/components/IconComponent.vue'
import payslips from '@/data/payslips.json'
import { format } from 'date-fns'
import { computed, ref } from 'vue'

const tabs = ref(
  payslips.reduce((acc: Map<string, number>, cur) => {
    const key = cur.payslipEntries[0]?.currency

    const val = acc.get(key)
    acc.set(key, val ? val + 1 : 1)

    return acc
  }, new Map<string, number>())
)

// If there are no tabs then fall back to USD
const selectedTab = ref(tabs.value.keys().next().value ?? 'USD')

const onTabSelect = (tab: string) => {
  openPdfIndex.value = undefined
  selectedTab.value = tab
}

const filteredPayslips = computed(() =>
  payslips
    .filter((payslip) => payslip.payslipEntries[0]?.currency === selectedTab.value)
    .sort((a, b) => new Date(b.payrollDate).getTime() - new Date(a.payrollDate).getTime())
)

const modalOpen = ref(false)
const toggleModal = () => (modalOpen.value = !modalOpen.value)

const openPdfIndex = ref<number | undefined>()

const onRowToggle = (index: number) => {
  if (openPdfIndex.value === index) {
    openPdfIndex.value = undefined
  } else {
    openPdfIndex.value = index
  }
}
</script>

<template>
  <div class="container">
    <h1>My Payslips</h1>
    <div class="tabs">
      <button
        class="tab"
        :class="{ active: tab === selectedTab }"
        v-for="tab in tabs.keys()"
        :key="'tab' + tab"
        @click="() => onTabSelect(tab)"
      >
        {{ tab }} ({{ tabs.get(tab) }})
      </button>
    </div>
    <div class="table">
      <div class="table__header table__row">
        <div class="table__cell">
          <p>#</p>
        </div>
        <div class="table__cell">
          <p>Month</p>
        </div>
        <div class="table__cell">
          <p>Payslip</p>
        </div>
        <div class="table__cell">
          <p>Gross salary</p>
        </div>
        <div class="table__cell">
          <p>Net pay</p>
        </div>
      </div>
      <div
        v-for="(payslip, index) in filteredPayslips"
        :key="'payslip' + payslip.fileAttachment?.id"
        class="table__row"
        @click="() => onRowToggle(index)"
        :class="openPdfIndex === index ? 'expanded' : ''"
      >
        <div class="table__cell">
          <p>{{ index + 1 }}</p>
        </div>
        <div class="table__cell table__cell--month">
          <button
            class="collapse tooltip"
            :data-tooltip="openPdfIndex === index ? 'Close' : 'Expand'"
          >
            <IconComponent
              name="chevron"
              :height="8"
              :width="8"
              :rotation="openPdfIndex === index ? 270 : 90"
            />
            <IconComponent
              name="chevron"
              :height="8"
              :width="8"
              :rotation="openPdfIndex === index ? 90 : 270"
            />
          </button>
          <p>{{ format(new Date(payslip.payrollDate), 'MMMM yyyy') }}</p>
        </div>
        <div class="table__cell table__cell--file-label">
          <p>{{ payslip.fileAttachment?.file?.label }}</p>
        </div>
        <div class="table__cell">
          <p>
            {{ payslip.payslipEntries?.find((el) => el.key === 'GROSS')?.amount.toFixed(2) }}
            {{ selectedTab }}
          </p>
        </div>
        <div class="table__cell">
          <p>
            {{ payslip.payslipEntries?.find((el) => el.key === 'NET PAY')?.amount.toFixed(2) }}
            {{ selectedTab }}
          </p>
        </div>
        <div class="pdf-container">
          <Transition :duration="300">
            <iframe
              v-if="openPdfIndex === index"
              :src="'payslipsFiles/' + payslip.fileAttachment?.accessToken + '.pdf'"
            ></iframe>
          </Transition>
        </div>
      </div>
      <button
        class="salary-evaluation tooltip"
        @click="toggleModal"
        data-tooltip="View salary evolution"
      >
        <span class="icon-wrapper">
          <IconComponent name="graph" :height="24" :width="24" />
        </span>
      </button>
    </div>

    <Transition :duration="300" name="modal">
      <div v-if="modalOpen" class="overlay">
        <div class="modal">
          <div class="modal__header">
            <h2>Gross/Net Salary evolution</h2>
            <button class="modal__close" @click="toggleModal">
              <IconComponent name="close" :height="24" :width="24" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
h1 {
  color: var(--black);
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.5;

  margin-left: 1.5rem;
}

.container {
  padding: 2rem 4.5rem;
}

@media screen and (max-width: 1280px) {
  .container {
    padding: 2rem 2rem;
  }
}

.tabs {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  margin-top: 1.875rem;
  padding-left: 1.5rem;
  height: 3.5rem;
  background-color: var(--black);
  border-radius: 0.5rem 1.75rem 1.75rem 0.5rem;

  z-index: 1;
}

.tab {
  appearance: none;
  border: none;
  display: grid;
  place-items: center;

  background-color: var(--black);
  color: var(---ffffff);
  font-size: 0.875rem;
  line-height: 1rem;
  font-weight: bold;
  padding: 1rem;

  transition: color 0.1s ease-out, background-color 0.1s ease-out;
}

.tab.active {
  background-color: var(--orange);
}

.tab:hover {
  color: var(--orange);
}

.tab.active:hover {
  color: var(---ffffff);
}

.table {
  position: relative;
  display: flex;
  flex-direction: column;

  background-color: var(---ffffff);
  padding: 2.5rem 4.5rem 5rem 4.5rem;
  margin-top: -1.5rem;
  border-radius: 0 0 0.75rem 0.75rem;

  box-shadow: 0px 3px 6px #fee5db4d;
  border: 1px solid #fee5db;

  --column-gap: 1rem;
  --table-columns: 3rem 7rem 1fr 7rem 7rem;
}

@media screen and (max-width: 1280px) {
  .table {
    padding: 2.5rem 1.5rem 5rem 1.5rem;
  }
}

.table__header {
  color: var(--dark-gray);
  font-size: 0.75rem;
  line-height: 1;
  font-weight: bold;
}

.table__row {
  display: grid;
  grid-template-columns: var(--table-columns);
  grid-template-rows: max-content 0;
  row-gap: 0.5rem;
  column-gap: var(--column-gap);
  padding: 0.75rem 2.5rem;
  border-bottom: 1px solid var(--light-gray);

  background-color: transparent;
  transition: background-color 0.3s ease-out, grid-template-rows 0.3s ease-out;
}

.table__row.expanded {
  grid-template-rows: max-content 800px;
}

.table__row:not(.table__header):hover,
.table__row.expanded {
  cursor: pointer;

  background-color: #fee5db;
  box-shadow: inset 0 0 0 1px var(--black);
}

.table__cell {
  display: flex;
  align-content: start;
  font-size: 0.875rem;
  line-height: 1.5;
}

.table__cell--month {
  height: min-content;

  position: relative;

  color: var(--orange);
}

.table__cell--file-label p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

button.collapse {
  position: absolute;

  cursor: pointer;

  appearance: none;
  border: none;
  background-color: transparent;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 1.5rem;

  border-radius: 999px;

  opacity: 0;

  overflow: visible;

  transition: all 0.3s ease-out;
}

button.collapse:hover {
  background-color: var(--black);
}

.table__row.expanded button.collapse,
button.collapse:hover {
  height: 2rem;
  row-gap: 0.5rem;
  top: -0.375rem;
}

.table__row.expanded button.collapse:hover,
button.collapse {
  height: 1.5rem;
  row-gap: 0;
  top: -0.125rem;
}

button.collapse:hover :deep(svg *) {
  fill: var(--orange);
}

.table__row .table__cell--month p {
  transition: transform 0.3s ease-out;
}

.table__row:hover button.collapse,
.table__row.expanded button.collapse {
  opacity: 1;
}

.table__row:hover .table__cell--month p,
.table__row.expanded .table__cell--month p {
  transform: translateX(2rem);
}

.pdf-container {
  grid-column: 1 / -1;
  overflow: hidden;
}

.pdf-container iframe {
  width: 100%;
  height: 100%;
}

.salary-evaluation {
  appearance: none;
  border: none;
  background-color: var(--light-grayish-blue);

  border-radius: 999px;

  cursor: pointer;

  position: absolute;
  top: 4rem;
  right: -1.75rem;

  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
}

.salary-evaluation .icon-wrapper {
  display: grid;
  place-items: center;

  height: 3rem;
  width: 3rem;
  border-radius: 999px;
  background-color: var(---ffffff);

  transition: background-color 0.2s ease-out;
}

.salary-evaluation:hover .icon-wrapper {
  background-color: var(---fee5db);
}

.tooltip::before {
  pointer-events: none;

  display: block;
  padding: 0.25rem 1rem;
  right: calc(100% + 0.5rem);

  content: attr(data-tooltip);
  white-space: nowrap;
  color: var(---ffffff);
  position: absolute;

  font-size: 0.875rem;
  line-height: 1.5;

  border-radius: 0.25rem;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.29);

  background-color: var(--black);
}

.tooltip::after {
  display: block;

  content: '';
  position: absolute;
  height: 0;
  width: 0;
  border-top: 5px solid transparent;
  border-left: 4px solid var(--black);
  border-bottom: 5px solid transparent;

  right: 100%;
  margin-right: 0.25rem;
}

.tooltip::before,
.tooltip::after {
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

.tooltip:hover::before,
.tooltip:hover::after {
  opacity: 1;
}

.collapse.tooltip::before {
  bottom: 100%;
  margin-bottom: 0.75rem;
  left: -1rem;
  width: max-content;
}

.collapse.tooltip::after {
  border-right: 5px solid transparent;
  border-top: 5px solid var(--black);
  border-left: 5px solid transparent;

  bottom: 100%;
  margin-bottom: 0.25rem;
  left: 50%;
  transform: translateX(-50%);
}

.overlay {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  z-index: 100;
  background-color: rgba(151, 160, 172, 0.8);
}

.modal {
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;

  z-index: 101;
  background-color: var(---ffffff);

  border-radius: 0.75rem 0.75rem 0 0;
  margin: 2.75rem 2.25rem 0 2.25rem;
}

.modal__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 2rem 3rem 1.5rem 4.5rem;
  border-bottom: 1px solid #97a0ac;
}

.modal__header h2 {
  color: var(--black);
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: bold;
}

.modal__close {
  appearance: none;
  border: none;
  background-color: var(--black);

  display: grid;
  place-items: center;

  width: 3rem;
  height: 3rem;

  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.29);

  border-radius: 999px;

  transition: background-color 0.3s ease-out;
}

.modal__close :deep(svg) {
  transition: rotate 0.3s ease-out;
}

.modal__close:hover {
  background-color: #303d63;
  cursor: pointer;
}

.modal__close:hover :deep(svg) {
  rotate: 90deg;
}

.modal__close :deep(svg *) {
  color: var(---ffffff);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease-out;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.3s ease-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: translateY(100%);
}
</style>
