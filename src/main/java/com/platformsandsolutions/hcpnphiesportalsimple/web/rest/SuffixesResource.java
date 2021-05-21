package com.platformsandsolutions.hcpnphiesportalsimple.web.rest;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Suffixes;
import com.platformsandsolutions.hcpnphiesportalsimple.repository.SuffixesRepository;
import com.platformsandsolutions.hcpnphiesportalsimple.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.platformsandsolutions.hcpnphiesportalsimple.domain.Suffixes}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SuffixesResource {

    private final Logger log = LoggerFactory.getLogger(SuffixesResource.class);

    private static final String ENTITY_NAME = "suffixes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SuffixesRepository suffixesRepository;

    public SuffixesResource(SuffixesRepository suffixesRepository) {
        this.suffixesRepository = suffixesRepository;
    }

    /**
     * {@code POST  /suffixes} : Create a new suffixes.
     *
     * @param suffixes the suffixes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new suffixes, or with status {@code 400 (Bad Request)} if the suffixes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/suffixes")
    public ResponseEntity<Suffixes> createSuffixes(@RequestBody Suffixes suffixes) throws URISyntaxException {
        log.debug("REST request to save Suffixes : {}", suffixes);
        if (suffixes.getId() != null) {
            throw new BadRequestAlertException("A new suffixes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Suffixes result = suffixesRepository.save(suffixes);
        return ResponseEntity
            .created(new URI("/api/suffixes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /suffixes/:id} : Updates an existing suffixes.
     *
     * @param id the id of the suffixes to save.
     * @param suffixes the suffixes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated suffixes,
     * or with status {@code 400 (Bad Request)} if the suffixes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the suffixes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/suffixes/{id}")
    public ResponseEntity<Suffixes> updateSuffixes(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Suffixes suffixes
    ) throws URISyntaxException {
        log.debug("REST request to update Suffixes : {}, {}", id, suffixes);
        if (suffixes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, suffixes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!suffixesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Suffixes result = suffixesRepository.save(suffixes);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, suffixes.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /suffixes/:id} : Partial updates given fields of an existing suffixes, field will ignore if it is null
     *
     * @param id the id of the suffixes to save.
     * @param suffixes the suffixes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated suffixes,
     * or with status {@code 400 (Bad Request)} if the suffixes is not valid,
     * or with status {@code 404 (Not Found)} if the suffixes is not found,
     * or with status {@code 500 (Internal Server Error)} if the suffixes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/suffixes/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Suffixes> partialUpdateSuffixes(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Suffixes suffixes
    ) throws URISyntaxException {
        log.debug("REST request to partial update Suffixes partially : {}, {}", id, suffixes);
        if (suffixes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, suffixes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!suffixesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Suffixes> result = suffixesRepository
            .findById(suffixes.getId())
            .map(
                existingSuffixes -> {
                    if (suffixes.getSuffix() != null) {
                        existingSuffixes.setSuffix(suffixes.getSuffix());
                    }

                    return existingSuffixes;
                }
            )
            .map(suffixesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, suffixes.getId().toString())
        );
    }

    /**
     * {@code GET  /suffixes} : get all the suffixes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of suffixes in body.
     */
    @GetMapping("/suffixes")
    public List<Suffixes> getAllSuffixes() {
        log.debug("REST request to get all Suffixes");
        return suffixesRepository.findAll();
    }

    /**
     * {@code GET  /suffixes/:id} : get the "id" suffixes.
     *
     * @param id the id of the suffixes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the suffixes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/suffixes/{id}")
    public ResponseEntity<Suffixes> getSuffixes(@PathVariable Long id) {
        log.debug("REST request to get Suffixes : {}", id);
        Optional<Suffixes> suffixes = suffixesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(suffixes);
    }

    /**
     * {@code DELETE  /suffixes/:id} : delete the "id" suffixes.
     *
     * @param id the id of the suffixes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/suffixes/{id}")
    public ResponseEntity<Void> deleteSuffixes(@PathVariable Long id) {
        log.debug("REST request to delete Suffixes : {}", id);
        suffixesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
