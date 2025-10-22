---
layout: page
title: Online Target Discovery with Generative Models
description: Online Target Discovery with Generative Models
img: assets/img/tar_disc.jpg
importance: 1
category: work
related_publications: false
---

**Objective:** We aim to address the challenge of efficiently discovering targets in environments where data collection is costly and only partial observations are possible, such as in medical imaging or remote sensing. Imagine searching for rare disease markers in medical scans, where each scan is expensive, and the goal is to identify affected regions quickly without exhaustive scanning. The core problem is how to strategically sample areas to maximize discovery given a limited budget of observations. Traditional methods either rely on full prior knowledge or extensive supervised training, which is often impractical. The paper proposes Diffusion-guided Active Target Discovery (DiffATD), which dynamically balances exploration (reducing uncertainty by sampling unknown regions) and exploitation (focusing on regions with high likelihood of targets). DiffATD maintains a belief distribution over unobserved states and incrementally learns a reward model to guide sampling decisions. This method does not require prior supervised training and offers interpretability, unlike black-box models. The objective is to enable efficient and adaptive target discovery in partially observable, costly environments by leveraging diffusion dynamics. The paper demonstrates through various experiments that DiffATD outperforms baseline methods and competes well with fully supervised approaches. Overall, DiffATD provides a principled, effective, and interpretable approach for active sampling in complex real-world scenarios.

Moreover, we also tackle scenarios where learning a strong prior is infeasible due to extremely limited data or high sampling costs, a limitation not fully addressed by prior work. While prior work relies on learned priors and diffusion dynamics for efficient target discovery, this new work develops a novel framework that enables effective active target discovery even with uninformative or weak priors. It introduces a memory mechanism inspired by neuroscience that combines permanent and transient memory components to guide adaptive exploration robustly. This approach guarantees a monotonic improvement in prior estimates after each observation, ensuring increasing accuracy and reliability in complex, dynamic real-world settings where prior knowledge is scarce. Thus, it extends active target discovery to more challenging conditions where prior work’s reliance on strong trained priors may falter, such as rare species discovery and rare disease identification. 




**Related Publications:**

1.  [Online Feedback Efficient Active Target Discovery in Partially Observable Environments](https://www.arxiv.org/abs/2505.06535) (NeurIPS 2025)

2.  [Active Target Discovery under Uninformative Prior: The Power of Permanent and Transient Memory](https://arxiv.org/abs/2510.16676) (NeurIPS 2025)



<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p2-1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p-2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/project4.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Representative figures from the papers. 
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p2-1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/p-2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/project4.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Representative figures from the papers. 
</div>


{% raw %}


{% endraw %}
