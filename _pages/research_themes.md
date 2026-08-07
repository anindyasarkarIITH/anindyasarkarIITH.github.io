---
layout: page
permalink: /research-themes/
title: research themes
description: An overview of the core themes underlying my research.
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
    <h2><a href="{{ '/research-themes/generative-modelling-and-sampling/' | relative_url }}">generative modelling and sampling</a></h2>
    <div class="research-theme-card">
        <img src="{{ 'assets/img/generative_modelling_sampling.gif' | relative_url }}" alt="Generative modelling and sampling: particles transported from a noise prior to a learned data distribution" loading="eager">
    </div>
</div>

<div class="research-theme-section">
    <h2><a href="{{ '/research-themes/applied-stochastic-process-and-control/' | relative_url }}">applied stochastic process and control</a></h2>
    <div class="research-theme-card">
        <img src="{{ 'assets/img/stochastic_process_control.gif' | relative_url }}" alt="Applied stochastic process and control: feedback control regulating a noisy process toward a target, compared against an uncontrolled random walk" loading="eager">
    </div>
</div>

{% include transport_viz.liquid %}

<div class="research-theme-section">
    <h2><a href="{{ '/research-themes/decision-making-partially-observable/' | relative_url }}">generative models for decision making in partially observable environments</a></h2>
    <div class="research-theme-card">
        <img src="{{ 'assets/img/generative_decision_making_pomdp.gif' | relative_url }}" alt="Generative models for decision making in partially observable environments: an agent uses a generative belief over the unobserved environment to actively decide where to query next, converging on the true target" loading="eager">
    </div>
</div>
