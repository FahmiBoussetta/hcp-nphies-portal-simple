package com.platformsandsolutions.hcpnphiesportalsimple.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.platformsandsolutions.hcpnphiesportalsimple.IntegrationTest;
import com.platformsandsolutions.hcpnphiesportalsimple.domain.Suffixes;
import com.platformsandsolutions.hcpnphiesportalsimple.repository.SuffixesRepository;
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
 * Integration tests for the {@link SuffixesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SuffixesResourceIT {

    private static final String DEFAULT_SUFFIX = "AAAAAAAAAA";
    private static final String UPDATED_SUFFIX = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/suffixes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SuffixesRepository suffixesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSuffixesMockMvc;

    private Suffixes suffixes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Suffixes createEntity(EntityManager em) {
        Suffixes suffixes = new Suffixes().suffix(DEFAULT_SUFFIX);
        return suffixes;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Suffixes createUpdatedEntity(EntityManager em) {
        Suffixes suffixes = new Suffixes().suffix(UPDATED_SUFFIX);
        return suffixes;
    }

    @BeforeEach
    public void initTest() {
        suffixes = createEntity(em);
    }

    @Test
    @Transactional
    void createSuffixes() throws Exception {
        int databaseSizeBeforeCreate = suffixesRepository.findAll().size();
        // Create the Suffixes
        restSuffixesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(suffixes)))
            .andExpect(status().isCreated());

        // Validate the Suffixes in the database
        List<Suffixes> suffixesList = suffixesRepository.findAll();
        assertThat(suffixesList).hasSize(databaseSizeBeforeCreate + 1);
        Suffixes testSuffixes = suffixesList.get(suffixesList.size() - 1);
        assertThat(testSuffixes.getSuffix()).isEqualTo(DEFAULT_SUFFIX);
    }

    @Test
    @Transactional
    void createSuffixesWithExistingId() throws Exception {
        // Create the Suffixes with an existing ID
        suffixes.setId(1L);

        int databaseSizeBeforeCreate = suffixesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSuffixesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(suffixes)))
            .andExpect(status().isBadRequest());

        // Validate the Suffixes in the database
        List<Suffixes> suffixesList = suffixesRepository.findAll();
        assertThat(suffixesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSuffixes() throws Exception {
        // Initialize the database
        suffixesRepository.saveAndFlush(suffixes);

        // Get all the suffixesList
        restSuffixesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(suffixes.getId().intValue())))
            .andExpect(jsonPath("$.[*].suffix").value(hasItem(DEFAULT_SUFFIX)));
    }

    @Test
    @Transactional
    void getSuffixes() throws Exception {
        // Initialize the database
        suffixesRepository.saveAndFlush(suffixes);

        // Get the suffixes
        restSuffixesMockMvc
            .perform(get(ENTITY_API_URL_ID, suffixes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(suffixes.getId().intValue()))
            .andExpect(jsonPath("$.suffix").value(DEFAULT_SUFFIX));
    }

    @Test
    @Transactional
    void getNonExistingSuffixes() throws Exception {
        // Get the suffixes
        restSuffixesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewSuffixes() throws Exception {
        // Initialize the database
        suffixesRepository.saveAndFlush(suffixes);

        int databaseSizeBeforeUpdate = suffixesRepository.findAll().size();

        // Update the suffixes
        Suffixes updatedSuffixes = suffixesRepository.findById(suffixes.getId()).get();
        // Disconnect from session so that the updates on updatedSuffixes are not directly saved in db
        em.detach(updatedSuffixes);
        updatedSuffixes.suffix(UPDATED_SUFFIX);

        restSuffixesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSuffixes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSuffixes))
            )
            .andExpect(status().isOk());

        // Validate the Suffixes in the database
        List<Suffixes> suffixesList = suffixesRepository.findAll();
        assertThat(suffixesList).hasSize(databaseSizeBeforeUpdate);
        Suffixes testSuffixes = suffixesList.get(suffixesList.size() - 1);
        assertThat(testSuffixes.getSuffix()).isEqualTo(UPDATED_SUFFIX);
    }

    @Test
    @Transactional
    void putNonExistingSuffixes() throws Exception {
        int databaseSizeBeforeUpdate = suffixesRepository.findAll().size();
        suffixes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSuffixesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, suffixes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(suffixes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Suffixes in the database
        List<Suffixes> suffixesList = suffixesRepository.findAll();
        assertThat(suffixesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSuffixes() throws Exception {
        int databaseSizeBeforeUpdate = suffixesRepository.findAll().size();
        suffixes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSuffixesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(suffixes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Suffixes in the database
        List<Suffixes> suffixesList = suffixesRepository.findAll();
        assertThat(suffixesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSuffixes() throws Exception {
        int databaseSizeBeforeUpdate = suffixesRepository.findAll().size();
        suffixes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSuffixesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(suffixes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Suffixes in the database
        List<Suffixes> suffixesList = suffixesRepository.findAll();
        assertThat(suffixesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSuffixesWithPatch() throws Exception {
        // Initialize the database
        suffixesRepository.saveAndFlush(suffixes);

        int databaseSizeBeforeUpdate = suffixesRepository.findAll().size();

        // Update the suffixes using partial update
        Suffixes partialUpdatedSuffixes = new Suffixes();
        partialUpdatedSuffixes.setId(suffixes.getId());

        partialUpdatedSuffixes.suffix(UPDATED_SUFFIX);

        restSuffixesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSuffixes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSuffixes))
            )
            .andExpect(status().isOk());

        // Validate the Suffixes in the database
        List<Suffixes> suffixesList = suffixesRepository.findAll();
        assertThat(suffixesList).hasSize(databaseSizeBeforeUpdate);
        Suffixes testSuffixes = suffixesList.get(suffixesList.size() - 1);
        assertThat(testSuffixes.getSuffix()).isEqualTo(UPDATED_SUFFIX);
    }

    @Test
    @Transactional
    void fullUpdateSuffixesWithPatch() throws Exception {
        // Initialize the database
        suffixesRepository.saveAndFlush(suffixes);

        int databaseSizeBeforeUpdate = suffixesRepository.findAll().size();

        // Update the suffixes using partial update
        Suffixes partialUpdatedSuffixes = new Suffixes();
        partialUpdatedSuffixes.setId(suffixes.getId());

        partialUpdatedSuffixes.suffix(UPDATED_SUFFIX);

        restSuffixesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSuffixes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSuffixes))
            )
            .andExpect(status().isOk());

        // Validate the Suffixes in the database
        List<Suffixes> suffixesList = suffixesRepository.findAll();
        assertThat(suffixesList).hasSize(databaseSizeBeforeUpdate);
        Suffixes testSuffixes = suffixesList.get(suffixesList.size() - 1);
        assertThat(testSuffixes.getSuffix()).isEqualTo(UPDATED_SUFFIX);
    }

    @Test
    @Transactional
    void patchNonExistingSuffixes() throws Exception {
        int databaseSizeBeforeUpdate = suffixesRepository.findAll().size();
        suffixes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSuffixesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, suffixes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(suffixes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Suffixes in the database
        List<Suffixes> suffixesList = suffixesRepository.findAll();
        assertThat(suffixesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSuffixes() throws Exception {
        int databaseSizeBeforeUpdate = suffixesRepository.findAll().size();
        suffixes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSuffixesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(suffixes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Suffixes in the database
        List<Suffixes> suffixesList = suffixesRepository.findAll();
        assertThat(suffixesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSuffixes() throws Exception {
        int databaseSizeBeforeUpdate = suffixesRepository.findAll().size();
        suffixes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSuffixesMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(suffixes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Suffixes in the database
        List<Suffixes> suffixesList = suffixesRepository.findAll();
        assertThat(suffixesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSuffixes() throws Exception {
        // Initialize the database
        suffixesRepository.saveAndFlush(suffixes);

        int databaseSizeBeforeDelete = suffixesRepository.findAll().size();

        // Delete the suffixes
        restSuffixesMockMvc
            .perform(delete(ENTITY_API_URL_ID, suffixes.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Suffixes> suffixesList = suffixesRepository.findAll();
        assertThat(suffixesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
