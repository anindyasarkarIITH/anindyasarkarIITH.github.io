---
layout: page
title: Online Feedback-Efficient Sampling for Search and Alignment
description: Generative Modelling, Sampling, Applied Stochastic Process
research_areas:
  - Generative Modelling
  - Sampling
  - Applied Stochastic Process
img: assets/img/papa_1.jpg
importance: 0
category: work
related_publications: false
---

**Objective:** We study online, feedback-efficient sampling from generative (diffusion/flow) models when the object of interest — a search target or a user's preference — is unknown in advance and is only revealed through sequential feedback under a limited query budget. Existing samplers either explore locally around a small region of the distribution or rely on rigid, non-adaptive proposal dynamics, causing them to waste budget or collapse to a single mode once feedback arrives. This line of work develops feedback-driven samplers that use each new piece of feedback to steer generation toward high-utility regions while preserving sample diversity and computational efficiency, enabling effective online search and personalized preference alignment within a fixed sampling budget.

**Related Publications:**

1.  [Sequentially-Controlled Interactive Multi-Particle Flow-Maps for Online Feedback-Driven Search](https://arxiv.org/abs/2607.01144) (arXiv 2026)

2.  [Bootstrap Flow-Map Tree Sampling Enables Online Feedback Driven Search](https://arxiv.org/abs/2607.02915) (arXiv 2026)

3.  [PAPA: Online Personalized Active Preference Alignment](https://arxiv.org/abs/2607.00486) (ECML PKDD 2026)


<style>
.feedback-align-figs img {
    width: 100%;
    height: 260px;
    object-fit: contain;
    background-color: var(--global-bg-color);
}
</style>
<div class="row feedback-align-figs">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/impfm_2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/bfmt_2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/papa_1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Representative figures from the papers.
</div>
