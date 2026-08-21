<template>
  <section id="faq" class="relative bg-background py-16 sm:py-28 w-full">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 right-0 h-125 w-125 rounded-full bg-primary/5 blur-[120px]"></div>
      <div class="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary/3 blur-[100px]"></div>
    </div>

    <div class="relative mx-auto max-w-300 px-4 sm:px-6 w-full">

      <!-- Section Header -->
      <div class="mx-auto mb-12 sm:mb-16 max-w-165 text-center">
        <span class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-primary">
          <CircleHelp :size="12" stroke-width="2.5" />
          Help Center
        </span>
        <h2 class="mt-4 font-display text-[1.875rem] sm:text-[2.75rem] leading-[1.15] tracking-tight text-text">
          Answers, before <br class="hidden sm:inline" />
          <span class="font-normal italic text-primary">you have to ask.</span>
        </h2>
        <p class="mt-3 sm:mt-4 text-[0.875rem] sm:text-[0.9375rem] leading-[1.7] text-text-muted max-w-lg mx-auto">
          Everything you need to know about ordering, delivery, and caring for your Kayora pieces.
        </p>
      </div>

      <div class="flex flex-col lg:grid lg:grid-cols-12 gap-8 sm:gap-12 items-start">

        <!-- Left: Support Card (stays fixed in place; only the accordion column scrolls) -->
        <div class="w-full lg:col-span-4 lg:self-start lg:sticky lg:top-28">
          <div class="relative overflow-hidden rounded-xl sm:rounded-[28px] border border-border/60 bg-white/70 backdrop-blur-md p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]">
            <div class="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl"></div>

            <span class="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <MessageCircleQuestionMark :size="20" stroke-width="1.8" />
            </span>

            <h3 class="relative mt-5 font-display text-[1.25rem] sm:text-[1.375rem] font-semibold tracking-tight text-text">
              Still have questions?
            </h3>
            <p class="relative mt-2 text-[0.8125rem] sm:text-[0.875rem] leading-relaxed text-text-muted">
              Can't find the answer you're looking for? Our team typically replies in under two hours.
            </p>

            <a
              href="mailto:support@kayora.com"
              class="relative mt-6 inline-flex items-center gap-2 rounded-full bg-text px-5 py-3 text-[0.75rem] font-bold uppercase tracking-wider text-white no-underline shadow-lg shadow-text/10 transition-all duration-300 hover:bg-primary active:scale-[0.98]"
            >
              <Mail :size="14" />
              Contact Support
            </a>

            <!-- Trust Stats Strip -->
            <div class="relative mt-7 grid grid-cols-3 gap-3 border-t border-border/60 pt-6">
              <div v-for="stat in stats" :key="stat.label" class="text-center sm:text-left">
                <p class="font-display text-[1.25rem] sm:text-[1.375rem] font-bold text-text leading-none">{{ stat.value }}</p>
                <p class="mt-1.5 text-[0.625rem] sm:text-[0.6875rem] leading-tight text-text-muted">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Accordion -->
        <div class="w-full lg:col-span-8 space-y-3 sm:space-y-4">

          <TransitionGroup name="faq-list" tag="div" class="space-y-3 sm:space-y-4">
            <div
              v-for="item in faqs"
              :key="item.question"
              :class="[
                'group rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden w-full',
                openQuestion === item.question
                  ? 'border-primary/30 bg-white/60 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]'
                  : 'border-border/60 bg-transparent hover:border-primary/20'
              ]"
            >
              <button
                type="button"
                class="flex w-full cursor-pointer items-center justify-between gap-3 p-4 sm:p-6 text-left border-none bg-transparent"
                @click="openQuestion = openQuestion === item.question ? null : item.question"
                :aria-expanded="openQuestion === item.question"
              >
                <div class="flex items-center gap-3 sm:gap-4 pr-2 min-w-0">
                  <span class="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary">
                    <component :is="categoryIcon(item.category)" :size="15" stroke-width="2" />
                  </span>

                  <span class="min-w-0">
                    <span class="block text-[0.9375rem] sm:text-[1rem] font-semibold tracking-wide leading-snug text-text/85 group-hover:text-text transition-colors duration-300">
                      {{ item.question }}
                    </span>
                    <span class="mt-0.5 hidden sm:block text-[0.6875rem] font-medium uppercase tracking-wider text-text-muted/60">
                      {{ categoryLabel(item.category) }}
                    </span>
                  </span>
                </div>

                <span
                  :class="[
                    'flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                    openQuestion === item.question
                      ? 'bg-primary text-white shadow-sm rotate-180'
                      : 'bg-primary/5 text-primary group-hover:bg-primary/10'
                  ]"
                >
                  <Minus v-if="openQuestion === item.question" class="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
                  <Plus v-else class="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
                </span>
              </button>

              <div
                class="grid transition-[grid-template-rows] duration-300 ease-out"
                :class="openQuestion === item.question ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
              >
                <div class="overflow-hidden">
                  <div class="px-4 pb-4 pt-0 sm:px-6 sm:pb-6 text-[0.8125rem] sm:text-[0.875rem] leading-relaxed text-text-muted pl-15 sm:pl-19">
                    {{ item.answer }}
                  </div>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import {
  Plus, Minus, Mail, MessageCircleQuestionMark,
  Truck, Wrench, Undo2, Leaf, ShieldCheck, Store, CircleHelp,
} from 'lucide-vue-next'

const openQuestion = ref('How long does delivery take?')

const stats = [
  { value: '<2h', label: 'Avg. reply time' },
  { value: '98%', label: 'Satisfaction rate' },
  { value: '24/7', label: 'Support access' },
]

const categories = [
  { id: 'shipping', label: 'Shipping', icon: Truck },
  { id: 'assembly', label: 'Assembly', icon: Wrench },
  { id: 'returns', label: 'Returns', icon: Undo2 },
  { id: 'sustainability', label: 'Sustainability', icon: Leaf },
  { id: 'warranty', label: 'Warranty', icon: ShieldCheck },
  { id: 'showroom', label: 'Showroom', icon: Store },
]

const faqs = [
  {
    category: 'shipping',
    question: 'How long does delivery take?',
    answer: 'In-stock items are delivered within 5–7 business days. Larger pieces made to order may take 2–4 weeks. You will receive a tracking link as soon as your order ships.',
  },
  {
    category: 'assembly',
    question: 'Do you offer assembly services?',
    answer: 'Yes. Professional assembly is available for most furniture at checkout. Smaller items come with clear instructions and tools if you prefer to assemble them yourself.',
  },
  {
    category: 'returns',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day hassle-free return window. If a piece does not fit your space or style, contact our support team and we will arrange a free pickup and full refund.',
  },
  {
    category: 'sustainability',
    question: 'Are your materials sustainably sourced?',
    answer: 'Absolutely. We use eco-certified wood, low-VOC finishes, and recycled packaging. Every supplier is audited against strict environmental and ethical standards.',
  },
  {
    category: 'warranty',
    question: 'Do your products come with a warranty?',
    answer: 'Every Kayora piece includes a 5-year structural warranty covering frames, joints, and mechanisms. Fabric and finish care guides help you keep everything looking new.',
  },
  {
    category: 'showroom',
    question: 'Can I visit a showroom before buying?',
    answer: 'Of course. Our flagship showroom is open seven days a week, and you can book a one-on-one design consultation online to explore fabrics, finishes, and layouts.',
  },
]

const categoryIcon = (id) => categories.find((c) => c.id === id)?.icon ?? CircleHelp
const categoryLabel = (id) => categories.find((c) => c.id === id)?.label ?? ''
</script>

<style scoped>
.faq-list-move,
.faq-list-enter-active,
.faq-list-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.faq-list-enter-from,
.faq-list-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
.faq-list-leave-active {
  position: absolute;
}
</style>