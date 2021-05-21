package com.platformsandsolutions.hcpnphiesportalsimple.web.rest;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Prefixes;
import com.platformsandsolutions.hcpnphiesportalsimple.repository.PrefixesRepository;
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
 * REST controller for managing {@link com.platformsandsolutions.hcpnphiesportalsimple.domain.Prefixes}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PrefixesResource {

    private final Logger log = LoggerFactory.getLogger(PrefixesResource.class);

    private static final String ENTITY_NAME = "prefixes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PrefixesRepository prefixesRepository;

    public PrefixesResource(PrefixesRepository prefixesRepository) {
        this.prefixesRepository = prefixesRepository;
    }

    /**
     * {@code POST  /prefixes} : Create a new prefixes.
     *
     * @param prefixes the prefixes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new prefixes, or with status {@code 400 (Bad Request)} if the prefixes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/prefixes")
    public ResponseEntity<Prefixes> createPrefixes(@RequestBody Prefixes prefixes) throws URISyntaxException {
        log.debug("REST request to save Prefixes : {}", prefixes);
        if (prefixes.getId() != null) {
            throw new BadRequestAlertException("A new prefixes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Prefixes result = prefixesRepository.save(prefixes);
        return ResponseEntity
            .created(new URI("/api/prefixes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /prefixes/:id} : Updates an existing prefixes.
     *
     * @param id the id of the prefixes to save.
     * @param prefixes the prefixes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prefixes,
     * or with status {@code 400 (Bad Request)} if the prefixes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the prefixes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prefixes/{id}")
    public ResponseEntity<Prefixes> updatePrefixes(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Prefixes prefixes
    ) throws URISyntaxException {
        log.debug("REST request to update Prefixes : {}, {}", id, prefixes);
        if (prefixes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, prefixes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!prefixesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Prefixes result = prefixesRepository.save(prefixes);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, prefixes.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /prefixes/:id} : Partial updates given fields of an existing prefixes, field will ignore if it is null
     *
     * @param id the id of the prefixes to save.
     * @param prefixes the prefixes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prefixes,
     * or with status {@code 400 (Bad Request)} if the prefixes is not valid,
     * or with status {@code 404 (Not Found)} if the prefixes is not found,
     * or with status {@code 500 (Internal Server Error)} if the prefixes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/prefixes/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Prefixes> partialUpdatePrefixes(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Prefixes prefixes
    ) throws URISyntaxException {
        log.debug("REST request to partial update Prefixes partially : {}, {}", id, prefixes);
        if (prefixes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, prefixes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!prefixesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Prefixes> result = prefixesRepository
            .findById(prefixes.getId())
            .map(
                existingPrefixes -> {
                    if (prefixes.getPrefix() != null) {
                        existingPrefixes.setPrefix(prefixes.getPrefix());
                    }

                    return existingPrefixes;
                }
            )
            .map(prefixesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, prefixes.getId().toString())
        );
    }

    /**
     * {@code GET  /prefixes} : get all the prefixes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of prefixes in body.
     */
    @GetMapping("/prefixes")
    public List<Prefixes> getAllPrefixes() {
        log.debug("REST request to get all Prefixes");
        return prefixesRepository.findAll();
    }

    /**
     * {@code GET  /prefixes/:id} : get the "id" prefixes.
     *
     * @param id the id of the prefixes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the prefixes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/prefixes/{id}")
    public ResponseEntity<Prefixes> getPrefixes(@PathVariable Long id) {
        log.debug("REST request to get Prefixes : {}", id);
        Optional<Prefixes> prefixes = prefixesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(prefixes);
    }

    /**
     * {@code DELETE  /prefixes/:id} : delete the "id" prefixes.
     *
     * @param id the id of the prefixes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/prefixes/{id}")
    public ResponseEntity<Void> deletePrefixes(@PathVariable Long id) {
        log.debug("REST request to delete Prefixes : {}", id);
        prefixesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
