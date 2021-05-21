package com.platformsandsolutions.hcpnphiesportalsimple.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.platformsandsolutions.hcpnphiesportalsimple.IntegrationTest;
import com.platformsandsolutions.hcpnphiesportalsimple.domain.Prefixes;
import com.platformsandsolutions.hcpnphiesportalsimple.repository.PrefixesRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PrefixesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PrefixesResourceIT {

    private static final String DEFAULT_PREFIX = "AAAAAAAAAA";
    private static final String UPDATED_PREFIX = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/prefixes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PrefixesRepository prefixesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPrefixesMockMvc;

    private Prefixes prefixes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Prefixes createEntity(EntityManager em) {
        Prefixes prefixes = new Prefixes().prefix(DEFAULT_PREFIX);
        return prefixes;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Prefixes createUpdatedEntity(EntityManager em) {
        Prefixes prefixes = new Prefixes().prefix(UPDATED_PREFIX);
        return prefixes;
    }

    @BeforeEach
    public void initTest() {
        prefixes = createEntity(em);
    }

    @Test
    @Transactional
    void createPrefixes() throws Exception {
        int databaseSizeBeforeCreate = prefixesRepository.findAll().size();
        // Create the Prefixes
        restPrefixesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(prefixes)))
            .andExpect(status().isCreated());

        // Validate the Prefixes in the database
        List<Prefixes> prefixesList = prefixesRepository.findAll();
        assertThat(prefixesList).hasSize(databaseSizeBeforeCreate + 1);
        Prefixes testPrefixes = prefixesList.get(prefixesList.size() - 1);
        assertThat(testPrefixes.getPrefix()).isEqualTo(DEFAULT_PREFIX);
    }

    @Test
    @Transactional
    void createPrefixesWithExistingId() throws Exception {
        // Create the Prefixes with an existing ID
        prefixes.setId(1L);

        int databaseSizeBeforeCreate = prefixesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrefixesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(prefixes)))
            .andExpect(status().isBadRequest());

        // Validate the Prefixes in the database
        List<Prefixes> prefixesList = prefixesRepository.findAll();
        assertThat(prefixesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPrefixes() throws Exception {
        // Initialize the database
        prefixesRepository.saveAndFlush(prefixes);

        // Get all the prefixesList
        restPrefixesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prefixes.getId().intValue())))
            .andExpect(jsonPath("$.[*].prefix").value(hasItem(DEFAULT_PREFIX)));
    }

    @Test
    @Transactional
    void getPrefixes() throws Exception {
        // Initialize the database
        prefixesRepository.saveAndFlush(prefixes);

        // Get the prefixes
        restPrefixesMockMvc
            .perform(get(ENTITY_API_URL_ID, prefixes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(prefixes.getId().intValue()))
            .andExpect(jsonPath("$.prefix").value(DEFAULT_PREFIX));
    }

    @Test
    @Transactional
    void getNonExistingPrefixes() throws Exception {
        // Get the prefixes
        restPrefixesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPrefixes() throws Exception {
        // Initialize the database
        prefixesRepository.saveAndFlush(prefixes);

        int databaseSizeBeforeUpdate = prefixesRepository.findAll().size();

        // Update the prefixes
        Prefixes updatedPrefixes = prefixesRepository.findById(prefixes.getId()).get();
        // Disconnect from session so that the updates on updatedPrefixes are not directly saved in db
        em.detach(updatedPrefixes);
        updatedPrefixes.prefix(UPDATED_PREFIX);

        restPrefixesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPrefixes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPrefixes))
            )
            .andExpect(status().isOk());

        // Validate the Prefixes in the database
        List<Prefixes> prefixesList = prefixesRepository.findAll();
        assertThat(prefixesList).hasSize(databaseSizeBeforeUpdate);
        Prefixes testPrefixes = prefixesList.get(prefixesList.size() - 1);
        assertThat(testPrefixes.getPrefix()).isEqualTo(UPDATED_PREFIX);
    }

    @Test
    @Transactional
    void putNonExistingPrefixes() throws Exception {
        int databaseSizeBeforeUpdate = prefixesRepository.findAll().size();
        prefixes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrefixesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, prefixes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(prefixes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Prefixes in the database
        List<Prefixes> prefixesList = prefixesRepository.findAll();
        assertThat(prefixesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPrefixes() throws Exception {
        int databaseSizeBeforeUpdate = prefixesRepository.findAll().size();
        prefixes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrefixesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(prefixes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Prefixes in the database
        List<Prefixes> prefixesList = prefixesRepository.findAll();
        assertThat(prefixesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPrefixes() throws Exception {
        int databaseSizeBeforeUpdate = prefixesRepository.findAll().size();
        prefixes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrefixesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(prefixes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Prefixes in the database
        List<Prefixes> prefixesList = prefixesRepository.findAll();
        assertThat(prefixesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePrefixesWithPatch() throws Exception {
        // Initialize the database
        prefixesRepository.saveAndFlush(prefixes);

        int databaseSizeBeforeUpdate = prefixesRepository.findAll().size();

        // Update the prefixes using partial update
        Prefixes partialUpdatedPrefixes = new Prefixes();
        partialUpdatedPrefixes.setId(prefixes.getId());

        restPrefixesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPrefixes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPrefixes))
            )
            .andExpect(status().isOk());

        // Validate the Prefixes in the database
        List<Prefixes> prefixesList = prefixesRepository.findAll();
        assertThat(prefixesList).hasSize(databaseSizeBeforeUpdate);
        Prefixes testPrefixes = prefixesList.get(prefixesList.size() - 1);
        assertThat(testPrefixes.getPrefix()).isEqualTo(DEFAULT_PREFIX);
    }

    @Test
    @Transactional
    void fullUpdatePrefixesWithPatch() throws Exception {
        // Initialize the database
        prefixesRepository.saveAndFlush(prefixes);

        int databaseSizeBeforeUpdate = prefixesRepository.findAll().size();

        // Update the prefixes using partial update
        Prefixes partialUpdatedPrefixes = new Prefixes();
        partialUpdatedPrefixes.setId(prefixes.getId());

        partialUpdatedPrefixes.prefix(UPDATED_PREFIX);

        restPrefixesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPrefixes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPrefixes))
            )
            .andExpect(status().isOk());

        // Validate the Prefixes in the database
        List<Prefixes> prefixesList = prefixesRepository.findAll();
        assertThat(prefixesList).hasSize(databaseSizeBeforeUpdate);
        Prefixes testPrefixes = prefixesList.get(prefixesList.size() - 1);
        assertThat(testPrefixes.getPrefix()).isEqualTo(UPDATED_PREFIX);
    }

    @Test
    @Transactional
    void patchNonExistingPrefixes() throws Exception {
        int databaseSizeBeforeUpdate = prefixesRepository.findAll().size();
        prefixes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrefixesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, prefixes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(prefixes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Prefixes in the database
        List<Prefixes> prefixesList = prefixesRepository.findAll();
        assertThat(prefixesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPrefixes() throws Exception {
        int databaseSizeBeforeUpdate = prefixesRepository.findAll().size();
        prefixes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrefixesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(prefixes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Prefixes in the database
        List<Prefixes> prefixesList = prefixesRepository.findAll();
        assertThat(prefixesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPrefixes() throws Exception {
        int databaseSizeBeforeUpdate = prefixesRepository.findAll().size();
        prefixes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrefixesMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(prefixes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Prefixes in the database
        List<Prefixes> prefixesList = prefixesRepository.findAll();
        assertThat(prefixesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePrefixes() throws Exception {
        // Initialize the database
        prefixesRepository.saveAndFlush(prefixes);

        int databaseSizeBeforeDelete = prefixesRepository.findAll().size();

        // Delete the prefixes
        restPrefixesMockMvc
            .perform(delete(ENTITY_API_URL_ID, prefixes.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Prefixes> prefixesList = prefixesRepository.findAll();
        assertThat(prefixesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
