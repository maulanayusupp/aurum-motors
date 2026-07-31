<script setup lang="ts">
// Contact form. Validates via contactService (i18n error keys), simulates a
// submit, and always offers an email handoff prefilled from the form — the
// fastest path to a human. No inline styles; all state-driven classes.
import { contactService, type ContactFieldErrors } from '~/services/contact.service'
import { mailLink } from '~/services/mail.service'
import type { ContactPayload } from '~/types'

const { t } = useI18n()

const form = reactive<ContactPayload>({ name: '', email: '', phone: '', message: '' })
const errors = reactive<ContactFieldErrors>({})
const submitting = ref(false)
const submitted = ref(false)

const mailHref = computed(() =>
  mailLink(
    t('contact.form.mailTemplate', {
      name: form.name || '—',
      message: form.message || t('mail.generic'),
    }),
    t('mail.subject'),
  ),
)

const clearErrors = () => {
  errors.name = undefined
  errors.email = undefined
  errors.message = undefined
}

const onSubmit = async () => {
  clearErrors()
  const fieldErrors = contactService.validate(form)
  if (Object.keys(fieldErrors).length) {
    Object.assign(errors, fieldErrors)
    return
  }
  submitting.value = true
  const result = await contactService.submit(form)
  submitting.value = false
  if (result.ok) submitted.value = true
}

const reset = () => {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.message = ''
  submitted.value = false
  clearErrors()
}
</script>

<template>
  <div class="contactform">
    <Transition name="swap" mode="out-in">
      <div v-if="submitted" key="success" class="success">
        <span class="success__icon"><BaseIcon name="check-circle" :size="30" /></span>
        <h3 class="success__title">{{ t('contact.form.successTitle') }}</h3>
        <p class="success__body">{{ t('contact.form.successBody') }}</p>
        <div class="success__actions">
          <BaseButton :href="mailHref" variant="primary" icon-left="mail">
            {{ t('contact.form.continueEmail') }}
          </BaseButton>
          <BaseButton variant="ghost" @click="reset">{{ t('contact.form.sendAnother') }}</BaseButton>
        </div>
      </div>

      <form v-else key="form" class="form" novalidate @submit.prevent="onSubmit">
        <div class="form__row">
          <BaseField
            v-model="form.name"
            :label="t('contact.form.name')"
            :placeholder="t('contact.form.namePlaceholder')"
            :error="errors.name ? t(errors.name) : undefined"
            autocomplete="name"
            required
          />
          <BaseField
            v-model="form.phone"
            :label="t('contact.form.phone')"
            :placeholder="t('contact.form.phonePlaceholder')"
            type="tel"
            autocomplete="tel"
          />
        </div>
        <BaseField
          v-model="form.email"
          :label="t('contact.form.email')"
          :placeholder="t('contact.form.emailPlaceholder')"
          type="email"
          :error="errors.email ? t(errors.email) : undefined"
          autocomplete="email"
          required
        />
        <BaseField
          v-model="form.message"
          :label="t('contact.form.message')"
          :placeholder="t('contact.form.messagePlaceholder')"
          :error="errors.message ? t(errors.message) : undefined"
          textarea
          required
        />

        <div class="form__actions">
          <BaseButton type="submit" variant="primary" size="lg" :loading="submitting" icon-right="arrow-right">
            {{ t('contact.form.submit') }}
          </BaseButton>
          <BaseButton :href="mailHref" variant="gold-outline" size="lg" icon-left="mail">
            {{ t('contact.form.orEmail') }}
          </BaseButton>
        </div>
        <p class="form__hint">{{ t('contact.form.privacyHint') }}</p>
      </form>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.contactform {
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;

  &__row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.1rem;

    @include respond-to('sm') {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    margin-top: 0.4rem;
  }

  &__hint {
    font-size: var(--fs-sm);
    color: var(--color-text-dim);
  }
}

.success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.9rem;
  padding: clamp(1.5rem, 4vw, 3rem) 1rem;

  &__icon {
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    color: var(--color-success);
    background: rgba(111, 208, 140, 0.12);
    border: 1px solid rgba(111, 208, 140, 0.3);
  }

  &__title {
    font-family: $font-display;
    font-size: var(--fs-h3);
  }

  &__body {
    color: var(--color-text-muted);
    max-width: 30rem;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    margin-top: 0.5rem;
  }
}

.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.3s $ease-out, transform 0.3s $ease-out;
}

.swap-enter-from,
.swap-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
