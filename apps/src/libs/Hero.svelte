<div>
   <slot name="left" />
   <slot name="right" />
</div>

<style>
   div {
      display: grid;
      min-height: 15rem;
      background: var(--hero-background);
      color: var(--hero-color);
      padding: 1rem 2rem;
      gap: 2rem;
   }

   div > :global(*) {
      display: inline-flex;
      flex-direction: column;
      /* justify-content: flex-start; */
      /* align-items: flex-start; */
   }

   @media (min-width: 768px) {
      div {
         grid-template-columns: 1fr 0.6fr;
      }
   }
</style>
