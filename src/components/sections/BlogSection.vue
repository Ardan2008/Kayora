<template>
  <section id="blog" class="relative bg-[#FAF9F6] py-24 overflow-hidden">
    <!-- Ambient Background Glow -->
    <div class="pointer-events-none absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]"></div>

    <div class="relative mx-auto max-w-300 px-6">

      <!-- Section Header -->
      <div class="mx-auto mb-16 max-w-155 text-center">
        <h2 class="font-display text-4xl font-semibold leading-tight text-text sm:text-[2.75rem]">
          Latest From Our Journal
        </h2>
        <p class="mt-4 text-sm leading-relaxed text-text-muted/80">
          Explore curated interior design stories, minimalist lifestyle guides, and spatial trends tailored by the Kayora creative team.
        </p>
      </div>

      <!-- Modern Blog Grid -->
      <div class="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
        <article
          v-for="post in posts"
          :key="post.id"
          @click="openPost(post)"
          class="group relative flex flex-col justify-between cursor-pointer overflow-hidden rounded-3xl border border-black/5 bg-white/70 p-3.5 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]"
        >
          <!-- Image Container -->
          <div class="relative aspect-[16/11] w-full overflow-hidden rounded-[18px] bg-[#f0ede6]">
            <img 
              :src="post.img" 
              :alt="post.title" 
              class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108" 
            />
            
            <!-- Glassmorphism Badge -->
            <span class="absolute top-3.5 left-3.5 rounded-full border border-white/30 bg-white/70 px-3.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-text backdrop-blur-md shadow-xs">
              {{ post.category }}
            </span>
          </div>

          <!-- Content Details -->
          <div class="flex flex-1 flex-col justify-between px-2 pt-5 pb-2">
            <div>
              <div class="mb-2.5 flex items-center gap-2 text-[0.75rem] text-text-muted/70">
                <span>{{ post.date }}</span>
                <span>•</span>
                <span>{{ post.readTime }} min read</span>
              </div>
              <h3 class="font-display text-[1.125rem] font-semibold leading-snug text-text transition-colors duration-200 group-hover:text-primary line-clamp-2">
                {{ post.title }}
              </h3>
              <p class="mt-2.5 text-[0.8125rem] leading-relaxed text-text-muted/80 line-clamp-2">
                {{ post.excerpt }}
              </p>
            </div>

            <!-- Magnetic Read More Link -->
            <div class="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
              <span class="text-[0.8125rem] font-bold text-text transition-colors group-hover:text-primary">
                Read Article
              </span>
              <div class="flex h-8 w-8 items-center justify-center rounded-full bg-background transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:translate-x-1">
                <ArrowUpRight :size="16" />
              </div>
            </div>
          </div>
        </article>
      </div>

    </div>

    <!-- Luxury Reading Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="selectedPost"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 sm:p-6 backdrop-blur-md"
          @click="closePost"
        >
          <Transition name="slide-up">
            <div
              v-if="selectedPost"
              class="relative flex max-h-[90vh] w-full max-w-[760px] flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl border border-white/40"
              @click.stop
            >
              <!-- Fixed Close Button -->
              <button
                @click="closePost"
                class="absolute top-6 right-6 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-white/80 text-text backdrop-blur-md transition-all hover:bg-primary hover:text-white hover:rotate-90 shadow-sm"
                aria-label="Close modal"
              >
                <X :size="18" />
              </button>

              <!-- Inner Scrollable Content -->
              <div class="custom-scrollbar overflow-y-auto p-6 sm:p-10">
                <!-- Modal Content -->
                <div class="mb-4 flex items-center gap-3">
                  <span class="rounded-full bg-primary/10 px-3.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-primary">
                    {{ selectedPost.category }}
                  </span>
                  <span class="text-[0.75rem] text-text-muted">{{ selectedPost.date }}</span>
                  <span class="text-[0.75rem] text-text-muted">•</span>
                  <span class="text-[0.75rem] text-text-muted">{{ selectedPost.readTime }} min read</span>
                </div>

                <h2 class="font-display text-2xl font-bold leading-tight text-text sm:text-3xl mb-6 pr-8">
                  {{ selectedPost.title }}
                </h2>

                <div class="mb-8 aspect-[16/9] w-full overflow-hidden rounded-[20px] bg-[#f0ede6] shadow-sm">
                  <img :src="selectedPost.img" :alt="selectedPost.title" class="h-full w-full object-cover" />
                </div>

                <!-- Article Content Body -->
                <div class="space-y-5 text-[0.9375rem] leading-relaxed text-text-muted/90">
                  <p class="font-medium text-text text-base leading-relaxed border-l-2 border-primary pl-4">
                    {{ selectedPost.excerpt }}
                  </p>
                  <p>
                    {{ selectedPost.content }}
                  </p>
                  <p>
                    At Kayora, design is not merely about aesthetic arrangement; it is about creating balance and emotion within functional living quarters. Choosing the right furniture pieces sets the rhythm for your entire home experience.
                  </p>
                </div>

                <!-- Modal Footer -->
                <div class="mt-10 flex items-center justify-between border-t border-border/60 pt-6">
                  <div class="flex items-center gap-3">
                    <div class="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                      KY
                    </div>
                    <div>
                      <p class="text-xs font-bold text-text">Kayora Editorial</p>
                      <p class="text-[0.6875rem] text-text-muted">Design & Architecture</p>
                    </div>
                  </div>

                  <button
                    @click="closePost"
                    class="rounded-full bg-text px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-primary cursor-pointer border-none shadow-md"
                  >
                    Close Story
                  </button>
                </div>
              </div>

            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { X, ArrowUpRight } from 'lucide-vue-next'

const selectedPost = ref(null)

const openPost = (post) => {
  selectedPost.value = post
  document.body.style.overflow = 'hidden'
}

const closePost = () => {
  selectedPost.value = null
  document.body.style.overflow = ''
}

const posts = [
  {
    id:       1,
    title:    'How To Style Furniture With Modern Elegance',
    category: 'Lifestyle',
    date:     'August 10, 2026',
    readTime: '4',
    excerpt:  'Make the most of your living room with carefully curated furniture that speaks to your personality while maintaining functionality.',
    content:  'Elegance in interior design starts with balance. Choose focal pieces like our Velvet Lou Armchair and complement them with subtle accent tables to create dynamic spaces without overwhelming the senses.',
    img:      '/images/lifestyle.png',
  },
  {
    id:       2,
    title:    'Minimalism In Modern Architectural Living Spaces',
    category: 'Design Tips',
    date:     'August 5, 2026',
    readTime: '3',
    excerpt:  'Discover how minimalist principles can transform cluttered spaces into serene sanctuaries that feel both functional and inspiring.',
    content:  'Minimalism isn\'t about empty rooms; it\'s about intentionality. Every item should serve a clear function or bring genuine aesthetic harmony to the inhabitant.',
    img:      '/images/design-tips.png',
  },
  {
    id:       3,
    title:    'Using Reflective Light Surfaces To Expand Spatial Depth',
    category: 'Tips & Tricks',
    date:     'July 28, 2026',
    readTime: '5',
    excerpt:  'Strategic mirror placement and reflective metallic surfaces can alter the perceived dimension of any room instantly.',
    content:  'By positioning reflective textures near direct light sources, natural illumination bounces across ambient corners, instantly generating depth and openness.',
    img:      '/images/tips&tricks.png',
  },
]
</script>

<style scoped>
/* Smooth Scale Hover Effect */
.scale-108 {
  transform: scale(1.08);
}

/* Modal Transition Effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.96);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(15px) scale(0.98);
}

/* Custom Thin Scrollbar Inside Modal */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  margin: 20px 0;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--color-primary, #000);
}
</style>