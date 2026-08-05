---
layout: page
permalink: /research-themes/
title: research themes
description: An overview of the core mathematical themes underlying my research.
nav: true
nav_order: 4
transport_viz: true
---

<!-- _pages/research_themes.md -->

<style>
.research-theme-section {
    margin-top: 1rem;
    margin-bottom: 3rem;
}
.research-theme-section h2 {
    margin-bottom: 1.25rem;
}
.research-theme-card {
    border: 1px solid var(--global-divider-color);
    border-radius: 0.75rem;
    background-color: var(--global-card-bg-color);
    padding: 1.5rem;
    overflow: hidden;
}
.research-theme-card img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 0.5rem;
}
</style>

<div class="research-theme-section">
    <h2>generative modelling and sampling</h2>
    <div class="research-theme-card">
        <img src="{{ 'assets/img/generative_modelling_sampling.gif' | relative_url }}" alt="Generative modelling and sampling: particles transported from a noise prior to a learned data distribution" loading="eager">
    </div>
</div>

{% include transport_viz.liquid %}
